"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AudioTerrain } from "./AudioTerrain";

export default function BackgroundCanvas() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setMounted(true);
    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) return null;

  if (!hasWebGL) {
    // Elegant hardware raster fallback
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#050505]">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FF0033_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-obsidian">
      <Canvas
        camera={{ position: [0, 1.5, 4.5], fov: 60 }}
        dpr={[1, 1.5]} // Adaptive DPR for mid-tier mobile performance
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <AudioTerrain />
      </Canvas>
    </div>
  );
}
