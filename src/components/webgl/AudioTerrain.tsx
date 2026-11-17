"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { audioEngine } from "@/lib/audio-engine";

const vertexShader = `
  uniform float uTime;
  uniform float uBass;
  uniform float uMid;
  uniform float uTreble;
  uniform float uScrollProgress;
  uniform float uLayerStage;

  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;

    vec3 pos = position;

    // Fast trigonometric displacement
    float wave1 = sin(pos.x * 0.45 + uTime * 0.7) * cos(pos.y * 0.45 + uTime * 0.5);
    float wave2 = sin(pos.x * 0.9 + pos.y * 0.9 + uTime * 0.3) * 0.8;

    // Audio-reactive punch
    float bassPunch = uBass * 2.5 * sin(pos.x * 1.0 + pos.y * 1.0);
    float midRipples = uMid * 1.2 * cos(pos.x * 2.0 + uTime * 1.5);
    float stageBoost = uLayerStage * 0.3;

    float elevation = (wave1 + wave2 + bassPunch + midRipples) * (0.6 + stageBoost);

    pos.z += elevation;

    vElevation = elevation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uBass;
  uniform float uMid;
  uniform float uTreble;
  uniform float uLayerStage;

  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vec3 obsidian = vec3(0.02, 0.02, 0.03);      // #050505
    vec3 crimson = vec3(1.0, 0.0, 0.2);          // #FF0033 Redline
    vec3 bloodCherry = vec3(0.9, 0.0, 0.17);     // #E6002B
    vec3 surgicalWhite = vec3(1.0, 1.0, 1.0);    // #FFFFFF

    float normalizedElev = clamp((vElevation + 1.2) / 3.5, 0.0, 1.0);

    vec3 layerColor = mix(bloodCherry, crimson, clamp(uLayerStage / 4.0, 0.0, 1.0));
    vec3 baseColor = mix(obsidian, layerColor, normalizedElev * (0.35 + uBass * 0.65));

    if (normalizedElev > 0.82 && uBass > 0.4) {
      baseColor = mix(baseColor, surgicalWhite, (normalizedElev - 0.82) * 3.5 * uBass);
    }

    float grid = abs(sin(vUv.x * 100.0)) * abs(sin(vUv.y * 100.0));
    float wireStrength = smoothstep(0.7, 0.98, grid);

    vec3 finalColor = mix(baseColor, crimson, wireStrength * (0.5 + uBass * 0.8));

    float distFromCenter = distance(vUv, vec2(0.5));
    float alpha = smoothstep(0.75, 0.2, distFromCenter);

    gl_FragColor = vec4(finalColor, alpha * 0.88);
  }
`;

export function AudioTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const audioValues = useRef({
    bass: 0,
    mid: 0,
    treble: 0,
    scrollProgress: 0,
    layerStage: 0,
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBass: { value: 0 },
      uMid: { value: 0 },
      uTreble: { value: 0 },
      uScrollProgress: { value: 0 },
      uLayerStage: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    [size.width, size.height]
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    const fft = audioEngine.getFFTData();

    // Lerp smoothing (Art Direction directive: never jitter)
    audioValues.current.bass = THREE.MathUtils.lerp(audioValues.current.bass, fft.bass, 0.15);
    audioValues.current.mid = THREE.MathUtils.lerp(audioValues.current.mid, fft.mid, 0.18);
    audioValues.current.treble = THREE.MathUtils.lerp(audioValues.current.treble, fft.treble, 0.22);

    let stage = 0;
    if (audioEngine.activeStems.drums) stage = 1;
    if (audioEngine.activeStems.bass808) stage = 2;
    if (audioEngine.activeStems.melody) stage = 3;
    if (audioEngine.activeStems.fx) stage = 4;
    audioValues.current.layerStage = THREE.MathUtils.lerp(audioValues.current.layerStage, stage, 0.1);

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const scroll = window.scrollY / maxScroll;
    audioValues.current.scrollProgress = THREE.MathUtils.lerp(audioValues.current.scrollProgress, scroll, 0.08);

    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    materialRef.current.uniforms.uBass.value = audioValues.current.bass;
    materialRef.current.uniforms.uMid.value = audioValues.current.mid;
    materialRef.current.uniforms.uTreble.value = audioValues.current.treble;
    materialRef.current.uniforms.uScrollProgress.value = audioValues.current.scrollProgress;
    materialRef.current.uniforms.uLayerStage.value = audioValues.current.layerStage;

    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 3 + audioValues.current.scrollProgress * 0.22;
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.06;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -1.2, -2]} rotation={[-Math.PI / 3, 0, 0]}>
      <planeGeometry args={[14, 14, 48, 48]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
