"use client";

import * as React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Color,
  MeshStandardMaterial,
  Plane,
  Vector3,
  type Group,
  type Mesh,
  type Object3D,
} from "three";

// Reusable scratch vectors for getWorldPosition in useFrame (no per-frame alloc).
const _leftWorld = new Vector3();
const _rightWorld = new Vector3();
import { BISCUIT, INTRO_TIMING } from "@/lib/three-scene";

interface Biscuit3DProps {
  onSplitStart: () => void;
  onComplete: () => void;
}

const COOKIE_URL = "/models/cookie.glb";
useGLTF.preload(COOKIE_URL);

const CRUMB_COUNT = 24;

// Walk a Three.js scene tree and replace each mesh's material with a fresh
// MeshStandardMaterial tinted to khatai colour. Returns refs to all the
// resulting materials so we can animate opacity / clipping per clone.
function tintAndCollectMaterials(
  root: Object3D,
  colour: string,
  clippingPlane: Plane | null,
): MeshStandardMaterial[] {
  const out: MeshStandardMaterial[] = [];
  root.traverse((o) => {
    if ((o as Mesh).isMesh) {
      const m = o as Mesh;
      m.castShadow = true;
      m.receiveShadow = true;
      const newMat = new MeshStandardMaterial({
        color: new Color(colour),
        roughness: BISCUIT.roughness,
        metalness: BISCUIT.metalness,
        transparent: true,
        opacity: 1,
      });
      if (clippingPlane) {
        newMat.clippingPlanes = [clippingPlane];
        newMat.clipShadows = true;
      }
      m.material = newMat;
      out.push(newMat);
    }
  });
  return out;
}

export function Biscuit3D({ onSplitStart, onComplete }: Biscuit3DProps) {
  const rootRef = React.useRef<Group>(null);
  const wheelRef = React.useRef<Group>(null);
  const fullRef = React.useRef<Group>(null);
  const leftRef = React.useRef<Group>(null);
  const rightRef = React.useRef<Group>(null);
  const crumbsRef = React.useRef<Group>(null);

  const { gl } = useThree();
  React.useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);

  // Load model once, clone three times so each instance has its own materials.
  const { scene: original } = useGLTF(COOKIE_URL);

  const fullScene = React.useMemo(() => original.clone(true), [original]);
  const leftScene = React.useMemo(() => original.clone(true), [original]);
  const rightScene = React.useMemo(() => original.clone(true), [original]);

  // Clipping planes: each half's clip follows the half, so it always shows
  // exactly half regardless of how far it has flown.
  const leftClip = React.useMemo(() => new Plane(new Vector3(-1, 0, 0), 0), []);
  const rightClip = React.useMemo(() => new Plane(new Vector3(1, 0, 0), 0), []);

  // Tint + collect material refs the GSAP timeline will animate.
  const fullMats = React.useMemo(
    () => tintAndCollectMaterials(fullScene, BISCUIT.color, null),
    [fullScene],
  );
  const leftMats = React.useMemo(
    () => tintAndCollectMaterials(leftScene, BISCUIT.color, leftClip),
    [leftScene, leftClip],
  );
  const rightMats = React.useMemo(
    () => tintAndCollectMaterials(rightScene, BISCUIT.color, rightClip),
    [rightScene, rightClip],
  );

  const crumbsActive = React.useRef(false);
  const crumbVelocities = React.useMemo(
    () =>
      Array.from({ length: CRUMB_COUNT }, () => ({
        x: (Math.random() - 0.5) * 5.5,
        y: 1.5 + Math.random() * 2.5,
        z: (Math.random() - 0.5) * 4,
        spin: (Math.random() - 0.5) * 9,
      })),
    [],
  );

  useFrame((_, delta) => {
    // Update clipping planes in WORLD space — local position.x doesn't track
    // when the parent wheelRef rotates during the rolling phase.
    if (leftRef.current) {
      leftRef.current.getWorldPosition(_leftWorld);
      leftClip.constant = _leftWorld.x;
    }
    if (rightRef.current) {
      rightRef.current.getWorldPosition(_rightWorld);
      rightClip.constant = -_rightWorld.x;
    }

    // Crumb physics
    if (crumbsActive.current && crumbsRef.current) {
      crumbsRef.current.children.forEach((child, i) => {
        const v = crumbVelocities[i];
        child.position.x += v.x * delta;
        child.position.y += v.y * delta;
        child.position.z += v.z * delta;
        child.rotation.x += v.spin * delta;
        child.rotation.y += v.spin * 0.6 * delta;
        v.y -= 9.8 * delta * 0.7;
      });
    }
  });

  useGSAP(
    () => {
      if (!rootRef.current || !wheelRef.current) return;
      if (!fullRef.current || !leftRef.current || !rightRef.current) return;
      if (fullMats.length === 0 || leftMats.length === 0 || rightMats.length === 0) return;

      // Reset
      rootRef.current.position.set(-7.5, 0, 0);
      rootRef.current.rotation.set(0, 0, 0);
      rootRef.current.scale.setScalar(1);
      wheelRef.current.rotation.set(0, 0, 0);

      fullMats.forEach((m) => (m.opacity = 1));
      leftMats.forEach((m) => (m.opacity = 0));
      rightMats.forEach((m) => (m.opacity = 0));

      leftRef.current.position.set(0, 0, 0);
      leftRef.current.rotation.set(0, 0, 0);
      rightRef.current.position.set(0, 0, 0);
      rightRef.current.rotation.set(0, 0, 0);

      if (crumbsRef.current) {
        crumbsRef.current.children.forEach((c) => {
          c.position.set(0, 0, 0);
          c.rotation.set(0, 0, 0);
          (c as Mesh).visible = false;
        });
      }
      crumbsActive.current = false;

      const tl = gsap.timeline({ onComplete });

      // 1. Roll in (the GLB cookie spins as it crosses the screen)
      tl.to(rootRef.current.position, {
        x: 0,
        duration: INTRO_TIMING.rollIn,
        ease: "power2.out",
      }, 0);
      tl.to(wheelRef.current.rotation, {
        z: -Math.PI * 2.4,
        duration: INTRO_TIMING.rollIn,
        ease: "power2.out",
      }, 0);

      // 2. Settle bounce
      tl.to(rootRef.current.scale, {
        x: 1.08, y: 1.08, z: 1.08,
        duration: INTRO_TIMING.settle * 0.4,
        ease: "power2.out",
      });
      tl.to(rootRef.current.scale, {
        x: 1, y: 1, z: 1,
        duration: INTRO_TIMING.settle * 0.6,
        ease: "elastic.out(1, 0.5)",
      });

      tl.to({}, { duration: INTRO_TIMING.pauseAfterSettle });

      // 3. Shake (someone gripping it)
      const shakeAmp = 0.05;
      const shakeStep = INTRO_TIMING.shake / 6;
      tl.to(rootRef.current.rotation, { z: -shakeAmp, duration: shakeStep, ease: "sine.inOut" });
      tl.to(rootRef.current.rotation, { z: shakeAmp, duration: shakeStep, ease: "sine.inOut" });
      tl.to(rootRef.current.rotation, { z: -shakeAmp * 1.4, duration: shakeStep, ease: "sine.inOut" });
      tl.to(rootRef.current.rotation, { z: shakeAmp * 1.4, duration: shakeStep, ease: "sine.inOut" });
      tl.to(rootRef.current.rotation, { z: 0, duration: shakeStep * 2, ease: "sine.inOut" });

      // 4. Squeeze
      tl.to(rootRef.current.scale, {
        x: 0.94, y: 1.06, z: 1,
        duration: INTRO_TIMING.crack * 0.6,
        ease: "power2.in",
      });

      // 5. SNAP
      tl.call(() => {
        onSplitStart();
        crumbsActive.current = true;
        if (crumbsRef.current) {
          crumbsRef.current.children.forEach((c) => {
            (c as Mesh).visible = true;
          });
        }
      });

      tl.to(fullMats, {
        opacity: 0,
        duration: 0.14,
        ease: "power2.out",
      });
      tl.to([...leftMats, ...rightMats], {
        opacity: 1,
        duration: 0.14,
        ease: "power2.out",
      }, "<");

      // Halves fly outward
      tl.to(leftRef.current.position, {
        x: -4.2, y: 0.25, z: 0.2,
        duration: INTRO_TIMING.breakApart,
        ease: "power3.in",
      });
      tl.to(leftRef.current.rotation, {
        z: 0.55, y: -0.45, x: -0.2,
        duration: INTRO_TIMING.breakApart,
        ease: "power3.in",
      }, "<");
      tl.to(rightRef.current.position, {
        x: 4.2, y: 0.25, z: 0.2,
        duration: INTRO_TIMING.breakApart,
        ease: "power3.in",
      }, "<");
      tl.to(rightRef.current.rotation, {
        z: -0.55, y: 0.45, x: -0.2,
        duration: INTRO_TIMING.breakApart,
        ease: "power3.in",
      }, "<");

      tl.to([...leftMats, ...rightMats], {
        opacity: 0,
        duration: 0.45,
        ease: "power2.in",
      }, "-=0.35");

      // No cleanup return — see prior comment about StrictMode.
    },
    { dependencies: [fullMats, leftMats, rightMats, onSplitStart, onComplete] },
  );

  // Auto-fit the model: Kenney models come at varying scales. The cookie.glb
  // is small, so we scale the whole rig up to roughly match BISCUIT.radius.
  const modelScale = 4.5;

  return (
    // Outer wrapper: tilt the whole scene forward so we look DOWN at the
    // cookie's top surface (3/4 perspective).
    <group rotation={[0.3, 0, 0]}>
      <group ref={rootRef}>
        <group ref={wheelRef}>
          {/* Inner orientation: the Kenney cookie GLB has its flat face along
              local +Y (Y-up convention). Rotating +90° around X swings that
              face toward +Z so the camera sees the top of the cookie, and the
              cookie's axle now lines up with Z so wheelRef.rotation.z rolls it
              like a real wheel. */}
          <group rotation={[Math.PI / 2, 0, 0]}>
            <group ref={fullRef} scale={modelScale}>
              <primitive object={fullScene} />
            </group>

            <group ref={leftRef} scale={modelScale}>
              <primitive object={leftScene} />
            </group>

            <group ref={rightRef} scale={modelScale}>
              <primitive object={rightScene} />
            </group>
          </group>
        </group>

        {/* crumbs */}
        <group ref={crumbsRef}>
          {Array.from({ length: CRUMB_COUNT }).map((_, i) => {
            const size = 0.04 + Math.random() * 0.07;
            return (
              <mesh key={i} visible={false} castShadow>
                <boxGeometry args={[size, size * 0.7, size * 0.8]} />
                <meshStandardMaterial color={BISCUIT.color} roughness={0.95} />
              </mesh>
            );
          })}
        </group>
      </group>
    </group>
  );
}
