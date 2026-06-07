import type { Object3D } from "three";

export type SceneId = string;

export interface TourState {
  currentScene: SceneId;
  nextScene: SceneId | null;
  isTransitioning: boolean;
  useGyro: boolean;
  showHotspots: boolean;
  autoRotate: boolean;
  isTourReady: boolean;
  transition: number;
  fadeOpacity: number;
  transitionType: "fade" | "zoom";
}

export interface TourActions {
  setScene: (scene: SceneId) => void;
  setNextScene: (scene: SceneId | null) => void;
  setIsTransitioning: (val: boolean) => void;
  toggleGyro: () => void;
  toggleHotspots: () => void;
  setAutoRotate: (val: boolean) => void;
  setTourReady: () => void;
  setTransition: (val: number) => void;
  setFadeOpacity: (val: number) => void;
  setTransitionType: (type: "fade" | "zoom") => void;
}

export interface ControlsRef {
  current: {
    setAzimuthalAngle?: (angle: number) => void;
    setPolarAngle?: (angle: number) => void;
    getAzimuthalAngle?: () => number;
    update?: () => void;
  } | null;
}

export interface TransitionControllerProps {
  nextScene: SceneId | null;
  setNextScene: (scene: SceneId | null) => void;
  setCurrentScene: (scene: SceneId) => void;
  setTransition: (fn: (prev: number) => number) => void;
  setIsTransitioning: (val: boolean) => void;
  transitionType: "fade" | "zoom";
  controlsRef: React.RefObject<Object3D | { setAzimuthalAngle?: (a: number) => void; setPolarAngle?: (a: number) => void; update?: () => void }>;
  setFadeOpacity: (fn: (prev: number) => number | number) => void;
}

export interface TourManagerProps {
  controlsRef: React.RefObject<Record<string, unknown>>;
  autoRotate: boolean;
  isTransitioning: boolean;
  onFullRotation: () => void;
  useGyro: boolean;
}
