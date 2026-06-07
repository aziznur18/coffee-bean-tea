"use client";

import { Html } from "@react-three/drei";
import Lottie from "lottie-react";
import navigationArrowAnimation from "@/../public/lottie/navigation-arrow.json";
import { DoorOpen } from "lucide-react";
import { IconStairsDown, IconStairsUp, IconBinoculars } from "@tabler/icons-react";
import { type HotspotType, getHotspotVariant } from "@/config/hotspot-variants.config";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  DoorOpen,
  StairsUp: IconStairsUp,
  StairsDown: IconStairsDown,
  Binoculars: IconBinoculars,
};

export type { HotspotType };

export default function Hotspot({
  position,
  onClick,
  type = "navigation",
  rotation = 0,
}: {
  position: readonly [number, number, number];
  onClick: () => void;
  type?: HotspotType;
  rotation?: number;
}) {
  const variant = getHotspotVariant(type);

  if (type === "navigation") {
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
            <div className="absolute w-20 h-20 rounded-full bg-white/20 blur-3xl" />
            <div className="relative flex items-center justify-center drop-shadow-[0_0_35px_rgba(255,255,255,0.9)]">
              <Lottie
                animationData={navigationArrowAnimation}
                loop
                rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
                style={{ width: 300, height: 300 }}
              />
            </div>
          </button>
        </Html>
      </group>
    );
  }

  const IconComponent = iconMap[variant.iconName];

  return (
    <group position={position}>
      <Html center>
        <button
          onClick={onClick}
          className={`relative flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300 ${variant.animationClass} ${variant.containerClass}`}
        >
          {variant.pulseClass && (
            <div className={`absolute inset-0 ${variant.pulseClass}`} />
          )}
          {IconComponent && <IconComponent size={34} className="text-white" />}
        </button>
      </Html>
    </group>
  );
}
