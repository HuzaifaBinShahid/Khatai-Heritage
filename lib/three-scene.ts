export const BISCUIT = {
  color: "#c19a6b",
  edgeColor: "#7a5a36",
  shadowColor: "#5a3f25",
  radius: 1.25,
  height: 0.42,
  segments: 96,
  roughness: 0.92,
  metalness: 0,
  // Real khatai photo (top-down) for the biscuit face
  textureUrl:
    "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=768&q=85",
} as const;

export const LIGHTING = {
  ambient: 0.35,
  keyIntensity: 1.6,
  keyPosition: [4, 6, 5] as [number, number, number],
  rimIntensity: 0.9,
  rimPosition: [-5, 3, -4] as [number, number, number],
  fillIntensity: 0.4,
  fillPosition: [0, -2, 5] as [number, number, number],
} as const;

export const INTRO_TIMING = {
  rollIn: 1.3,
  settle: 0.4,
  pauseAfterSettle: 0.25,
  shake: 0.5,
  crack: 0.18,
  breakApart: 0.55,
  curtainDelay: 0.05,
  curtainDuration: 0.95,
} as const;
