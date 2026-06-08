"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { tourConfig } from "@/config/tour.config";
import { sceneLookup, getNextScene } from "@/config/scenes.config";
import { useTourStore } from "@/store/tour-store";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ControlsRef = React.RefObject<any>;

export default function Controls({ controlsRef }: { controlsRef: ControlsRef }) {
  const nextScene = useTourStore((s) => s.nextScene);
  const transitionType = useTourStore((s) => s.transitionType);
  const setNextScene = useTourStore((s) => s.setNextScene);
  const setCurrentScene = useTourStore((s) => s.setCurrentScene);
  const setIsTransitioning = useTourStore((s) => s.setIsTransitioning);
  const setTransition = useTourStore((s) => s.setTransition);
  const setFadeOpacity = useTourStore((s) => s.setFadeOpacity);
  const setBlurIntensity = useTourStore((s) => s.setBlurIntensity);

  return (
    <>
      <TransitionController
        nextScene={nextScene}
        transitionType={transitionType}
        controlsRef={controlsRef}
        setNextScene={setNextScene}
        setCurrentScene={setCurrentScene}
        setIsTransitioning={setIsTransitioning}
        setTransition={setTransition}
        setFadeOpacity={setFadeOpacity}
        setBlurIntensity={setBlurIntensity}
      />
      <TourManager controlsRef={controlsRef} />
    </>
  );
}

function TransitionController({
  nextScene,
  transitionType,
  controlsRef,
  setNextScene,
  setCurrentScene,
  setIsTransitioning,
  setTransition,
  setFadeOpacity,
  setBlurIntensity,
}: {
  nextScene: string | null;
  transitionType: "fade" | "zoom";
  controlsRef: ControlsRef;
  setNextScene: (s: string | null) => void;
  setCurrentScene: (s: string) => void;
  setIsTransitioning: (v: boolean) => void;
  setTransition: (fn: (prev: number) => number) => void;
  setFadeOpacity: (val: number | ((prev: number) => number)) => void;
  setBlurIntensity: (val: number) => void;
}) {
  const { camera } = useThree();
  const trans = tourConfig.transitions;
  const camConfig = tourConfig.camera;

  useEffect(() => {
    if (nextScene) {
      setIsTransitioning(true);
    }
  }, [nextScene, setIsTransitioning]);

  useFrame(() => {
    if (!nextScene) return;

    setTransition((prev) => {
      const next = prev + trans.speed;
      const cam = camera as THREE.PerspectiveCamera;
      const progress = Math.min(next, 1);

      if (transitionType === "zoom") {
        if (progress <= 0.3) {
          // Phase 1: Zoom in — FOV 75→50, blur mulai
          const p = progress / 0.3;
          const eased = easeOutCubic(p);
          cam.fov = THREE.MathUtils.lerp(camConfig.fov, trans.zoom.fovEnd, eased);
          setBlurIntensity(easeInOutQuad(p) * 8);
          setFadeOpacity(0);
        } else if (progress <= 0.5) {
          // Phase 2: Push through + blur tunnel — FOV 50→100, blur naik
          const p = (progress - 0.3) / 0.2;
          const eased = easeInOutQuad(p);
          cam.fov = THREE.MathUtils.lerp(trans.zoom.fovEnd, trans.zoom.zoomOutFov, eased);
          setBlurIntensity(8 + easeInOutQuad(p) * 7);
          setFadeOpacity(easeInOutQuad(p));
        } else if (progress <= 0.75) {
          // Phase 3: Scene B reveal — FOV 100→75, blur turun
          const p = (progress - 0.5) / 0.25;
          const eased = easeInOutQuad(p);
          cam.fov = THREE.MathUtils.lerp(trans.zoom.zoomOutFov, camConfig.fov, eased);
          setBlurIntensity((1 - eased) * 15);
          setFadeOpacity(1 - eased);
        } else {
          // Phase 4: Settle
          cam.fov = camConfig.fov;
          setBlurIntensity(0);
          setFadeOpacity(0);
        }
        cam.updateProjectionMatrix();
      }

      if (transitionType === "fade") {
        setBlurIntensity(0);
        setFadeOpacity(1 - Math.min(next, 1));
      }

      if (next >= 0.5 && nextScene) {
        setCurrentScene(nextScene);
      }

      if (next >= 1) {
        setNextScene(null);
        setIsTransitioning(false);
        setFadeOpacity(0);
        setBlurIntensity(0);
        cam.fov = camConfig.fov;
        cam.updateProjectionMatrix();

        const targetSceneData = sceneLookup[nextScene];
        if (controlsRef.current?.setAzimuthalAngle && targetSceneData?.initialView) {
          const angleRad = (targetSceneData.initialView.yaw * Math.PI) / 180;
          controlsRef.current.setAzimuthalAngle(angleRad);
          controlsRef.current.setPolarAngle(Math.PI / 2);
          controlsRef.current.update();
        }

        return 0;
      }

      return next;
    });
  });

  return null;
}

function TourManager({ controlsRef }: { controlsRef: ControlsRef }) {
  const autoRotate = useTourStore((s) => s.autoRotate);
  const isTransitioning = useTourStore((s) => s.isTransitioning);
  const useGyro = useTourStore((s) => s.useGyro);
  const currentScene = useTourStore((s) => s.currentScene);
  const lastAngle = useRef(0);
  const accumulatedAngle = useRef(0);

  useFrame(() => {
    if (!controlsRef.current || useGyro || !controlsRef.current.getAzimuthalAngle) return;

    const currentAngle = controlsRef.current.getAzimuthalAngle();

    if (isTransitioning) {
      accumulatedAngle.current = 0;
      lastAngle.current = currentAngle;
      return;
    }

    if (autoRotate && !isTransitioning) {
      let delta = currentAngle - lastAngle.current;
      if (delta < -Math.PI) delta += Math.PI * 2;
      if (delta > Math.PI) delta -= Math.PI * 2;
      accumulatedAngle.current += Math.abs(delta);

      if (accumulatedAngle.current >= Math.PI * 2) {
        accumulatedAngle.current = 0;
        const next = getNextScene(currentScene);
        useTourStore.getState().setNextScene(next);
        useTourStore.getState().setTransitionType("fade");
      }
    } else if (!autoRotate) {
      accumulatedAngle.current = 0;
    }

    lastAngle.current = currentAngle;
  });

  return null;
}
