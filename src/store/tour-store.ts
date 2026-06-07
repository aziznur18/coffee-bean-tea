import { create } from "zustand";
import { tourConfig } from "@/config/tour.config";

export interface TourState {
  currentScene: string;
  nextScene: string | null;
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
  setCurrentScene: (scene: string) => void;
  setNextScene: (scene: string | null) => void;
  setIsTransitioning: (val: boolean) => void;
  setUseGyro: (val: boolean) => void;
  toggleGyro: () => void;
  toggleHotspots: () => void;
  setAutoRotate: (val: boolean) => void;
  setTourReady: () => void;
  setTransition: (fn: (prev: number) => number) => void;
  setFadeOpacity: (val: number | ((prev: number) => number)) => void;
  setTransitionType: (type: "fade" | "zoom") => void;
  resetTransition: () => void;
}

type TourStore = TourState & TourActions;

export const useTourStore = create<TourStore>((set, get) => ({
  currentScene: tourConfig.tour.defaultScene,
  nextScene: null,
  isTransitioning: false,
  useGyro: false,
  showHotspots: true,
  autoRotate: false,
  isTourReady: false,
  transition: 0,
  fadeOpacity: 0,
  transitionType: tourConfig.tour.transitionDefault,

  setCurrentScene: (scene) => set({ currentScene: scene }),
  setNextScene: (scene) => set({ nextScene: scene }),
  setIsTransitioning: (val) => set({ isTransitioning: val }),
  setUseGyro: (val) => set({ useGyro: val, autoRotate: false }),

  toggleGyro: () => {
    const next = !get().useGyro;
    set({ useGyro: next, autoRotate: false });
  },

  toggleHotspots: () => set((s) => ({ showHotspots: !s.showHotspots })),

  setAutoRotate: (val) => set({ autoRotate: val }),

  setTourReady: () => set({ isTourReady: true }),

  setTransition: (fn) => set((s) => ({ transition: fn(s.transition) })),

  setFadeOpacity: (val) =>
    set((s) => ({
      fadeOpacity: typeof val === "function" ? val(s.fadeOpacity) : val,
    })),

  setTransitionType: (type) => set({ transitionType: type }),

  resetTransition: () =>
    set({ transition: 0, fadeOpacity: 0, nextScene: null, isTransitioning: false }),
}));
