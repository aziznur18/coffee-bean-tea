export type HotspotType = "portal" | "navigation" | "stair-up" | "stair-down" | "binocular";

export interface HotspotVariantConfig {
  iconName: string;
  containerClass: string;
  pulseClass?: string;
  animationClass: string;
  lottieAnimation?: string;
  size?: string;
}

export const hotspotVariants: Record<HotspotType, HotspotVariantConfig> = {
  portal: {
    iconName: "DoorOpen",
    containerClass: "w-20 h-20 rounded-full border-4 border-white bg-black/20 shadow-[0_0_40px_rgba(255,255,255,0.35)]",
    pulseClass: "rounded-full border-2 border-white/40 animate-hotspot-pulse",
    animationClass: "animate-hotspot-float",
  },
  navigation: {
    iconName: "NavigationArrow",
    containerClass: "w-36 h-36",
    lottieAnimation: "navigation-arrow",
    animationClass: "animate-nav-bounce",
  },
  "stair-up": {
    iconName: "StairsUp",
    containerClass: "w-20 h-20 rounded-full border-4 border-white bg-black/20 shadow-[0_0_40px_rgba(255,255,255,0.35)]",
    pulseClass: "rounded-full border-2 border-white/40 animate-hotspot-pulse",
    animationClass: "animate-hotspot-float",
  },
  "stair-down": {
    iconName: "StairsDown",
    containerClass: "w-20 h-20 rounded-full border-4 border-white bg-black/20 shadow-[0_0_40px_rgba(255,255,255,0.35)]",
    pulseClass: "rounded-full border-2 border-white/40 animate-hotspot-pulse",
    animationClass: "animate-hotspot-float",
  },
  binocular: {
    iconName: "Binoculars",
    containerClass: "w-20 h-20 rounded-full border-4 border-white bg-black/20 shadow-[0_0_40px_rgba(255,255,255,0.35)]",
    pulseClass: "rounded-full border-2 border-white/40 animate-hotspot-pulse",
    animationClass: "animate-hotspot-float",
  },
};

export function getHotspotVariant(type: string): HotspotVariantConfig {
  return hotspotVariants[type as HotspotType] || hotspotVariants.navigation;
}
