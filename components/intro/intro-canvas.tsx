"use client";

import * as React from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, PerspectiveCamera } from "@react-three/drei";
import { Biscuit3D } from "@/components/intro/biscuit-3d";
import { LIGHTING } from "@/lib/three-scene";

interface IntroCanvasProps {
  onSplitStart: () => void;
  onComplete: () => void;
}

export default function IntroCanvas({ onSplitStart, onComplete }: IntroCanvasProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        // Enable per-material clipping planes — the broken halves use these
        // so each half always renders as exactly half regardless of position.
        gl.localClippingEnabled = true;
      }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    >
      {/* Camera at biscuit height so the biscuit is centred in the viewport.
          The 3/4 perspective comes from the biscuit's own forward tilt inside
          Biscuit3D — keeping the camera level keeps the biscuit centred. */}
      <PerspectiveCamera makeDefault fov={28} position={[0, 0, 8]} />

      {/* Three-point lighting: warm key, saffron rim, cool fill. */}
      <ambientLight intensity={LIGHTING.ambient} />
      <directionalLight
        position={LIGHTING.keyPosition}
        intensity={LIGHTING.keyIntensity}
        color="#fff5dc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
      />
      <directionalLight
        position={LIGHTING.rimPosition}
        intensity={LIGHTING.rimIntensity}
        color="#ffd28a"
      />
      <directionalLight
        position={LIGHTING.fillPosition}
        intensity={LIGHTING.fillIntensity}
        color="#9bb4ff"
      />

      <React.Suspense fallback={null}>
        <Environment preset="apartment" environmentIntensity={0.55} />
        <Biscuit3D onSplitStart={onSplitStart} onComplete={onComplete} />
      </React.Suspense>

      <ContactShadows
        position={[0, -1.6, 0]}
        opacity={0.6}
        scale={10}
        blur={2.4}
        far={3}
      />
    </Canvas>
  );
}
