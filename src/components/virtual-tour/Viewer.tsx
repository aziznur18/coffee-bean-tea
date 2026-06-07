"use client";

import { Suspense, useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, DeviceOrientationControls } from "@react-three/drei";
import { tourConfig } from "@/config/tour.config";
import { sceneLookup } from "@/config/scenes.config";
import { useTourStore } from "@/store/tour-store";
import { type HotspotType } from "@/config/hotspot-variants.config";
import Hotspot from "@/components/virtual-tour/Hotspot";
import Controls from "@/components/virtual-tour/Controls";
import PanoramaSphere from "@/components/virtual-tour/PanoramaSphere";
import IntroAnimation from "@/components/virtual-tour/IntroAnimation";

export default function Viewer() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);
  const interactTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState(0);

  const isTourReady = useTourStore((s) => s.isTourReady);
  const isTransitioning = useTourStore((s) => s.isTransitioning);
  const autoRotate = useTourStore((s) => s.autoRotate);
  const useGyro = useTourStore((s) => s.useGyro);
  const currentScene = useTourStore((s) => s.currentScene);
  const showHotspots = useTourStore((s) => s.showHotspots);
  const setAutoRotate = useTourStore((s) => s.setAutoRotate);
  const setNextScene = useTourStore((s) => s.setNextScene);
  const setTransitionType = useTourStore((s) => s.setTransitionType);

  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const introPlayedRef = useRef(false);

  const cam = tourConfig.camera;
  const ar = tourConfig.autoRotate;

  const initialYaw = sceneLookup[currentScene]?.initialView?.yaw || 0;
  const initialAngleRad = (initialYaw * Math.PI) / 180;
  const startX = Math.sin(initialAngleRad) * 0.1;
  const startZ = Math.cos(initialAngleRad) * 0.1;

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const startInactivityTimer = useCallback(() => {
    if (interactTimeoutRef.current) clearTimeout(interactTimeoutRef.current);
    setAutoRotate(false);

    if (!isTransitioning && isTourReady && !useGyro) {
      interactTimeoutRef.current = setTimeout(() => {
        setAutoRotate(true);
      }, ar.inertiaTimeoutMs);
    }
  }, [isTransitioning, isTourReady, useGyro, setAutoRotate, ar.inertiaTimeoutMs]);

  useEffect(() => {
    if (isTourReady) startInactivityTimer();
    return () => {
      if (interactTimeoutRef.current) clearTimeout(interactTimeoutRef.current);
    };
  }, [startInactivityTimer, isTourReady]);

  useEffect(() => {
    if (!autoRotate || isTransitioning) return;

    const interval = setInterval(() => {
      setAutoRotateSpeed((prev) => {
        if (prev >= ar.speedMax) {
          clearInterval(interval);
          return ar.speedMax;
        }
        return prev + ar.acceleration;
      });
    }, ar.accelerationIntervalMs);

    return () => {
      clearInterval(interval);
      setAutoRotateSpeed(0);
    };
  }, [autoRotate, isTransitioning, ar.speedMax, ar.acceleration, ar.accelerationIntervalMs]);

  const handleInteractStart = () => {
    if (interactTimeoutRef.current) clearTimeout(interactTimeoutRef.current);
    setAutoRotate(false);
  };

  const handleInteractEnd = () => {
    startInactivityTimer();
  };

  const handleSceneChange = useCallback(
    (targetScene: string, type: "fade" | "zoom" = "fade") => {
      if (targetScene === currentScene || useTourStore.getState().nextScene) return;
      setTransitionType(type);
      setNextScene(targetScene);
    },
    [currentScene, setTransitionType, setNextScene],
  );

  const sceneData = sceneLookup[currentScene];

  return (
    <Canvas
      flat
      camera={{
        position: [startX, 0, startZ],
        fov: cam.fov,
        near: cam.near,
        far: cam.far,
      }}
      gl={{
        antialias: tourConfig.performance.antialias,
        powerPreference: tourConfig.performance.powerPreference,
        alpha: tourConfig.performance.alpha,
        stencil: tourConfig.performance.stencil,
        depth: tourConfig.performance.depth,
      }}
      onCreated={({ gl }) => {
        gl.domElement.style.cursor = "grab";
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <Suspense fallback={null}>
        <Preload all />
        <Controls controlsRef={controlsRef} />
        <PanoramaSphere currentScene={currentScene} />
        {showHotspots &&
          !isTransitioning &&
          sceneData?.hotspots.map((hotspot) => (
            <Hotspot
              key={hotspot.id}
              position={hotspot.position}
              type={hotspot.variant as HotspotType}
              rotation={hotspot.rotation}
              onClick={() => handleSceneChange(hotspot.target, hotspot.transitionType)}
            />
          ))}
        {useGyro && <DeviceOrientationControls />}
        {!introPlayedRef.current && currentScene === "scene_1" && (
          <IntroAnimation ready={isTourReady} onFinish={() => { introPlayedRef.current = true; setIsIntroFinished(true); }} />
        )}
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enabled={isIntroFinished && !useGyro}
          enableZoom={false}
          enablePan={false}
          enableDamping
          rotateSpeed={isMobile ? cam.rotateSpeed.mobile : cam.rotateSpeed.desktop}
          dampingFactor={isMobile ? cam.dampingFactor.mobile : cam.dampingFactor.desktop}
          autoRotate={autoRotate && !useGyro}
          autoRotateSpeed={autoRotateSpeed}
          onStart={handleInteractStart}
          onEnd={handleInteractEnd}
        />
      </Suspense>
    </Canvas>
  );
}
