export type HotspotType = "navigation" | "icon";

export interface IconConfig {
  source: "icon" | "lottie" | "image";
  name: string;
  animation?: string;
}

export const hotspotAnimations: Record<string, string> = {
  "float-breath": "animate-hotspot-float-breath",
  "tick-rotate": "animate-tick-rotate",
};

export interface HotspotVariantConfig {
  containerClass: string;
  animationClass: string;
  pulseClass?: string;
  pulseDelayedClass?: string;
  lottieAnimation?: string;
}

export const hotspotVariants: Record<HotspotType, HotspotVariantConfig> = {
  navigation: {
    containerClass: "",
    lottieAnimation: "navigation-arrow",
    animationClass: "animate-nav-glow",
  },
  icon: {
    containerClass:
      "rounded-full border-4 border-white bg-black/20 shadow-[0_0_40px_rgba(255,255,255,0.35)]",
    pulseClass: "rounded-full border-2 border-white/40 animate-hotspot-pulse",
    pulseDelayedClass:
      "rounded-full border-2 border-white/40 animate-hotspot-pulse-delayed",
    animationClass: "animate-hotspot-float-breath",
  },
};

export function getHotspotVariant(type: string): HotspotVariantConfig {
  return hotspotVariants[type as HotspotType] || hotspotVariants.icon;
}
