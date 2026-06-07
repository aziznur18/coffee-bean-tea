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
}: {
  nextScene: string | null;
  transitionType: "fade" | "zoom";
  controlsRef: ControlsRef;
  setNextScene: (s: string | null) => void;
  setCurrentScene: (s: string) => void;
  setIsTransitioning: (v: boolean) => void;
  setTransition: (fn: (prev: number) => number) => void;
  setFadeOpacity: (val: number | ((prev: number) => number)) => void;
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

      if (transitionType === "zoom") {
        const eased = easeOutCubic(Math.min(next, 1));
        cam.fov = THREE.MathUtils.lerp(camConfig.fov, trans.zoom.fovEnd, eased);
        cam.updateProjectionMatrix();
      }

      if (transitionType === "fade") {
        if (next <= 0.5) {
          setFadeOpacity(next * 2);
        } else {
          setFadeOpacity((1 - next) * 2);
        }
      }

      if (next >= 0.5 && nextScene) {
        setCurrentScene(nextScene);
      }

      if (next >= 1) {
        setNextScene(null);
        setIsTransitioning(false);
        setFadeOpacity(0);
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
