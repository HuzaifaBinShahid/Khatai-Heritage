import {
  BufferAttribute,
  CatmullRomCurve3,
  Color,
  LatheGeometry,
  SphereGeometry,
  Vector2,
  Vector3,
  type BufferGeometry,
} from "three";

/**
 * Procedural khatai — the biscuit in the intro is generated here rather than
 * loaded from a stock model, so it actually looks like our khatai: a wide,
 * domed shortbread with a baked crack across the top and a whole roasted
 * almond pressed into the middle.
 *
 * Everything is deterministic (seeded hash noise), so the shape is identical
 * on every load and between server and client.
 */

// ---------------------------------------------------------------- noise ----

function hash3(x: number, y: number, z: number) {
  let h = Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(z | 0, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

const smooth = (t: number) => t * t * (3 - 2 * t);

/** Value noise in 3D, range 0..1. */
function noise3(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = smooth(x - xi), yf = smooth(y - yi), zf = smooth(z - zi);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const c = (dx: number, dy: number, dz: number) => hash3(xi + dx, yi + dy, zi + dz);
  return lerp(
    lerp(lerp(c(0, 0, 0), c(1, 0, 0), xf), lerp(c(0, 1, 0), c(1, 1, 0), xf), yf),
    lerp(lerp(c(0, 0, 1), c(1, 0, 1), xf), lerp(c(0, 1, 1), c(1, 1, 1), xf), yf),
    zf,
  );
}

/** Fractal noise, range roughly -1..1. */
function fbm(x: number, y: number, z: number, octaves = 3) {
  let sum = 0, amp = 1, freq = 1, norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += (noise3(x * freq, y * freq, z * freq) * 2 - 1) * amp;
    norm += amp;
    amp *= 0.5;
    freq *= 2.07;
  }
  return sum / norm;
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

// --------------------------------------------------------------- khatai ----

/** Silhouette of the biscuit, revolved around Y: wide base, domed top. */
const PROFILE: [number, number][] = [
  [0.0, -0.2],
  [0.45, -0.205],
  [0.8, -0.2],
  [0.95, -0.165],
  [1.0, -0.07],
  [1.0, 0.03],
  [0.965, 0.13],
  [0.875, 0.205],
  [0.7, 0.265],
  [0.45, 0.305],
  [0.2, 0.328],
  [0.0, 0.335],
];

// Where the cracks run. Angles in radians, each with its own width and depth.
const CRACKS = [
  { angle: 0.35, width: 0.13, depth: 1.0 },
  { angle: 1.55, width: 0.1, depth: 0.7 },
  { angle: 2.5, width: 0.12, depth: 0.9 },
  { angle: 3.75, width: 0.11, depth: 0.95 },
  { angle: 4.9, width: 0.1, depth: 0.8 },
];

/** How deep the baked crack runs at this point of the top surface, 0..1. */
function crackMask(phi: number, rho: number) {
  if (rho > 0.98) return 0;
  // Fade in away from the centre, fade out before the rim.
  const radial = smoothstep(0.28, 0.52, rho) * (1 - smoothstep(0.78, 0.98, rho));
  if (radial <= 0) return 0;
  let mask = 0;
  for (let i = 0; i < CRACKS.length; i++) {
    const c = CRACKS[i];
    // Wander the crack so it is never a straight line.
    const wander = fbm(rho * 1.8, i * 7.3, 0.5, 2) * 0.2;
    let d = Math.abs(((phi - (c.angle + wander) + Math.PI) % (Math.PI * 2)) - Math.PI);
    d = Math.min(d, Math.PI * 2 - d);
    mask = Math.max(mask, Math.exp(-((d / c.width) ** 2)) * c.depth);
  }
  return mask * radial;
}

export const KHATAI_RADIUS = 1.25;

export function createKhataiGeometry(): BufferGeometry {
  const curve = new CatmullRomCurve3(PROFILE.map(([x, y]) => new Vector3(x, y, 0)));
  const points = curve.getPoints(96).map((p) => new Vector2(Math.max(p.x, 0), p.y));
  const geo = new LatheGeometry(points, 288);
  geo.computeVertexNormals();

  const pos = geo.attributes.position as BufferAttribute;
  const nor = geo.attributes.normal as BufferAttribute;
  const colors = new Float32Array(pos.count * 3);

  const top = new Color("#c8843a");       // egg-washed dome
  const side = new Color("#dcb47a");      // pale crumb at the sides
  const deep = new Color("#6f3f13");      // inside the cracks
  const rim = new Color("#a66a2a");       // browned edge
  const tmp = new Color();

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const nx = nor.getX(i), ny = nor.getY(i), nz = nor.getZ(i);

    const rho = Math.hypot(x, z);
    const phi = Math.atan2(z, x);
    // 1 on the domed top, 0 on the sides and base.
    const topness = smoothstep(-0.02, 0.22, y) * smoothstep(0.02, 0.2, ny + 0.2);

    // Hand-shaped edge: never a perfect circle.
    const wobble = 1 + 0.022 * Math.sin(phi * 3 + 0.9) + 0.014 * Math.sin(phi * 5 - 2.1);
    x *= wobble;
    z *= wobble;

    // Crumb surface: broad lumps plus a fine bake grain.
    const lumps = fbm(x * 3.1, y * 3.1, z * 3.1, 3) * 0.02;
    const grain = fbm(x * 17, y * 17, z * 17, 2) * 0.009 + fbm(x * 41, y * 41, z * 41, 1) * 0.004;
    const bump = lumps + grain;
    x += nx * bump;
    y += ny * bump;
    z += nz * bump;

    // Cracks: press the top down along the fissures.
    const crack = crackMask(phi, rho) * topness;
    y -= crack * 0.1;
    const inward = crack * 0.015;
    x -= (x / (rho || 1)) * inward;
    z -= (z / (rho || 1)) * inward;

    pos.setXYZ(i, x, y, z);

    // Colour: pale crumb at the sides, golden on top, dark inside the cracks,
    // with uneven browning so no two patches bake the same.
    const browning = fbm(x * 2.2, y * 2.2, z * 2.2, 3) * 0.5 + 0.5;
    tmp.copy(side).lerp(top, topness * (0.78 + browning * 0.22));
    // The rim catches the most colour in the oven.
    tmp.lerp(rim, smoothstep(0.72, 0.99, rho) * topness * (0.45 + browning * 0.4));
    tmp.lerp(deep, Math.min(crack * 1.2, 0.92));
    tmp.offsetHSL(0, 0, (browning - 0.5) * 0.09);
    // Specks of dry flour and crumb catching the light.
    const fleck = noise3(x * 55, y * 55, z * 55);
    if (fleck > 0.82) tmp.offsetHSL(0, -0.05, 0.05 * (fleck - 0.82) * 5);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  geo.setAttribute("color", new BufferAttribute(colors, 3));
  geo.scale(KHATAI_RADIUS, KHATAI_RADIUS, KHATAI_RADIUS);
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  return geo;
}

/** The whole roasted almond that sits in the middle of the biscuit. */
export function createAlmondGeometry(): BufferGeometry {
  const geo = new SphereGeometry(0.5, 80, 52);
  const pos = geo.attributes.position as BufferAttribute;
  const colors = new Float32Array(pos.count * 3);

  const skin = new Color("#6d4119");
  const lit = new Color("#ab7433");
  const tmp = new Color();

  for (let i = 0; i < pos.count; i++) {
    // Almond proportions: long, narrow, flattened.
    let x = pos.getX(i) * 0.46;
    let y = pos.getY(i) * 0.3;
    let z = pos.getZ(i) * 0.82;

    // Taper to a point at one end, keep the other end round.
    const u = clamp01((z / 0.82 + 1) / 2);
    x *= 1 - 0.55 * u * u;
    y *= 1 - 0.34 * u * u;

    // Flatten the underside so it beds into the dough.
    if (y < -0.1) y = -0.1 + (y + 0.1) * 0.35;

    // Shallow crease down the top, plus skin grain.
    if (y > 0) y -= 0.03 * Math.exp(-((x / 0.07) ** 2));
    const grain = fbm(x * 26, y * 26, z * 26, 2) * 0.006;
    x += x * grain;
    y += y * grain * 1.4;
    z += z * grain;

    pos.setXYZ(i, x, y, z);

    const shade = fbm(x * 9, y * 9, z * 9, 3) * 0.5 + 0.5;
    tmp.copy(skin).lerp(lit, shade * clamp01(0.35 + y * 3));
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }

  geo.setAttribute("color", new BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  geo.computeBoundingSphere();
  return geo;
}

/** An irregular crumb, for the shower of debris when the biscuit snaps. */
export function createCrumbGeometry(size: number, seed: number): BufferGeometry {
  const geo = new SphereGeometry(size, 7, 5);
  const pos = geo.attributes.position as BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const n = 0.55 + noise3(x * 40 + seed, y * 40, z * 40) * 0.9;
    pos.setXYZ(i, x * n, y * n, z * n);
  }
  geo.computeVertexNormals();
  return geo;
}
