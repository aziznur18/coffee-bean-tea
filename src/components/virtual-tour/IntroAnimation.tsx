"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { tourConfig } from "@/config/tour.config";

interface IntroAnimationProps {
  ready: boolean;
  onFinish: () => void;
}

const {
  startPosY: START_POS_Y,
  startFov: START_FOV,
  targetFov: TARGET_FOV,
  holdDuration: HOLD_DURATION,
  animDuration: ANIM_DURATION,
} = tourConfig.intro;

export default function IntroAnimation({ ready, onFinish }: IntroAnimationProps) {
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  const initializedRef = useRef(false);
  const finishedRef = useRef(false);
  const holdTimerRef = useRef(0);
  const animTimerRef = useRef(0);
  const quatStartRef = useRef(new THREE.Quaternion());
  const quatEndRef = useRef(new THREE.Quaternion());
  const enabled = tourConfig.intro.enabled;

  useEffect(() => {
    if (!enabled) {
      finishedRef.current = true;
      onFinish();
    }
  }, [enabled, onFinish]);

  useFrame((_, delta) => {
    const cam = cameraRef.current as THREE.PerspectiveCamera;

    if (!enabled || finishedRef.current) return;

    if (!initializedRef.current) {
      cam.fov = START_FOV;
      const origX = cam.position.x;
      const origZ = cam.position.z;

      cam.position.set(origX, START_POS_Y, origZ);
      cam.lookAt(0, 0, 0);
      quatStartRef.current.copy(cam.quaternion);

      cam.position.set(origX, 0, origZ);
      cam.lookAt(0, 0, 0);
      quatEndRef.current.copy(cam.quaternion);

      cam.position.y = START_POS_Y;
      cam.quaternion.copy(quatStartRef.current);
      cam.updateProjectionMatrix();
      initializedRef.current = true;
      return;
    }

    if (!ready) return;

    holdTimerRef.current += delta;
    if (holdTimerRef.current < HOLD_DURATION) return;

    animTimerRef.current += delta;
    const progress = Math.min(animTimerRef.current / ANIM_DURATION, 1);
    const eased = progress * progress * progress;

    cam.fov = START_FOV + (TARGET_FOV - START_FOV) * eased;
    cam.position.y = START_POS_Y * (1 - eased);
    cam.quaternion.copy(quatStartRef.current).slerp(quatEndRef.current, eased);
    cam.updateProjectionMatrix();

    if (progress >= 1) {
      cam.fov = TARGET_FOV;
      cam.position.y = 0;
      cam.quaternion.copy(quatEndRef.current);
      cam.updateProjectionMatrix();
      finishedRef.current = true;
      onFinish();
    }
  });

  if (!enabled) return null;

  return null;
}
