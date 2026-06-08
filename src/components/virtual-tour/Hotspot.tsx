"use client";

import { Html } from "@react-three/drei";
import Lottie from "lottie-react";
import { ChevronUp, CircleDot, DoorOpen, RotateCcw, Undo2 } from "lucide-react";
import {
  IconStairsDown,
  IconStairsUp,
  IconBinoculars,
} from "@tabler/icons-react";
import {
  type HotspotType,
  type IconConfig,
  getHotspotVariant,
  hotspotAnimations,
} from "@/config/hotspot-variants.config";
import { getLottieAnimation } from "@/config/lottie-registry";

export type { HotspotType };

const iconRegistry: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  DoorOpen,
  IconStairsUp,
  IconStairsDown,
  IconBinoculars,
  ChevronUp,
  CircleDot,
  Undo2,
  RotateCcw,
};

const BASE_NAV_LOTTIE = 300;
const BASE_NAV_GLOW = 80;
const BASE_ICON_CONTAINER = 80;
const BASE_ICON_SIZE = 34;

export default function Hotspot({
  position,
  onClick,
  type = "navigation",
  rotation = 0,
  scale = 1,
  icon,
}: {
  position: readonly [number, number, number];
  onClick: () => void;
  type?: HotspotType;
  rotation?: number;
  scale?: number;
  icon?: IconConfig;
}) {
  const variant = getHotspotVariant(type);

  if (type === "navigation") {
    const lottieSize = Math.round(BASE_NAV_LOTTIE * scale);
    const glowSize = Math.round(BASE_NAV_GLOW * scale);

    return (
      <group
        position={position}
        rotation={[-Math.PI / 2, 0, (rotation * Math.PI) / 180]}
      >
        <Html transform distanceFactor={300}>
          <button
            onClick={onClick}
            className={`relative flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 ${variant.animationClass}`}
          >
            <div
              className="absolute rounded-full bg-white/20 blur-3xl"
              style={{ width: glowSize, height: glowSize }}
            />
            <div className="relative flex items-center justify-center drop-shadow-[0_0_35px_rgba(255,255,255,0.9)]">
              <Lottie
                animationData={getLottieAnimation(
                  variant.lottieAnimation ?? "",
                )}
                loop
                style={{ width: lottieSize, height: lottieSize }}
              />
            </div>
          </button>
        </Html>
      </group>
    );
  }

  const containerSize = Math.round(BASE_ICON_CONTAINER * scale);
  const iconSize = Math.round(BASE_ICON_SIZE * scale);

  let content: React.ReactNode = null;

  if (icon?.source === "image") {
    content = (
      <img
        src={icon.name}
        alt=""
        className="w-full h-full object-cover rounded-full"
      />
    );
  } else if (icon?.source === "lottie") {
    const animationData = getLottieAnimation(icon.name);
    if (animationData) {
      content = (
        <Lottie
          animationData={animationData}
          loop
          style={{ width: containerSize, height: containerSize }}
        />
      );
    }
  } else {
    const IconComponent = iconRegistry[icon?.name ?? ""];
    if (IconComponent) {
      content = <IconComponent size={iconSize} className="text-white" />;
    }
  }

  const animClass = icon?.animation
    ? hotspotAnimations[icon.animation] ?? variant.animationClass
    : variant.animationClass;

  return (
    <group position={position}>
      <Html center>
        <button
          onClick={onClick}
          className={`relative flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 ${animClass} ${variant.containerClass}`}
          style={{ width: containerSize, height: containerSize }}
        >
          {variant.pulseClass && (
            <>
              <div className={`absolute inset-0 ${variant.pulseClass}`} />
              {variant.pulseDelayedClass && (
                <div
                  className={`absolute inset-0 ${variant.pulseDelayedClass}`}
                />
              )}
            </>
          )}
          {content}
        </button>
      </Html>
    </group>
  );
}
