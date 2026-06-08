import type { IconConfig } from "@/config/hotspot-variants.config";

export interface HotspotData {
  id: string;
  target: string;
  type: "navigation" | "icon";
  icon?: IconConfig;
  scale?: number;
  transitionType: "fade" | "zoom";
  position: readonly [number, number, number];
  rotation: number;
}

export interface SceneData {
  id: string;
  name: string;
  image: string;
  initialView?: {
    yaw: number;
  };
  hotspots: HotspotData[];
}

export interface ScenesConfig {
  scenes: SceneData[];
  lookup: Record<string, SceneData>;
  keys: string[];
}

const scenesList: SceneData[] = [
  {
    id: "scene_1",
    name: "Depan",
    image: "/panoramas/scene-1.jpg",
    initialView: { yaw: -100 },
    hotspots: [
      {
        id: "scene-1-to-scene-2",
        target: "scene_2",
        type: "icon",
        scale: 1.2,
        icon: {
          source: "image",
          name: "/icons/cbat.png",
          animation: "tick-rotate",
        },
        transitionType: "zoom",
        position: [120, -60, 100] as const,
        rotation: 90,
      },
    ],
  },
  {
    id: "scene_2",
    name: "Lantai 1",
    image: "/panoramas/scene-2.jpg",
    initialView: { yaw: 220 },
    hotspots: [
      {
        id: "scene-2-to-scene-3",
        target: "scene_3",
        type: "icon",
        scale: 1.3,
        icon: { source: "icon", name: "ChevronUp" },
        transitionType: "zoom",
        position: [65, 0, 0] as const,
        rotation: 180,
      },
      {
        id: "scene-2-to-scene-5",
        target: "scene_5",
        type: "navigation",
        transitionType: "zoom",
        position: [60, -180, 400] as const,
        rotation: -65,
      },
    ],
  },
  {
    id: "scene_3",
    name: "Lantai 2 Tangga",
    image: "/panoramas/scene-3.jpg",
    initialView: { yaw: 60 },
    hotspots: [
      {
        id: "scene-3-to-scene-4",
        target: "scene_4",
        type: "icon",
        scale: 1.3,
        icon: { source: "icon", name: "CircleDot" },
        transitionType: "zoom",
        position: [-190, 0, -100] as const,
        rotation: 120,
      },
      {
        id: "scene-3-to-scene-2",
        target: "scene_2",
        type: "icon",
        scale: 1.3,
        icon: { source: "icon", name: "RotateCcw" },
        transitionType: "zoom",
        position: [100, 0, -50] as const,
        rotation: -60,
      },
    ],
  },
  {
    id: "scene_4",
    name: "No Smoking Room",
    image: "/panoramas/scene-4.jpg",
    initialView: { yaw: 180 },
    hotspots: [
      {
        id: "scene-4-to-scene-3",
        target: "scene_3",
        type: "icon",
        scale: 1.3,
        icon: { source: "icon", name: "RotateCcw" },
        transitionType: "zoom",
        position: [-120, 0, 35] as const,
        rotation: 0,
      },
    ],
  },
  {
    id: "scene_5",
    name: "Smoking Room",
    image: "/panoramas/scene-5.jpg",
    initialView: { yaw: 222 },
    hotspots: [
      {
        id: "scene-5-to-scene-2",
        target: "scene_2",
        type: "navigation",
        transitionType: "zoom",
        position: [-0, -200, -350] as const,
        rotation: 100,
      },
      {
        id: "scene-5-to-scene-6",
        target: "scene_6",
        type: "icon",
        scale: 1.3,
        icon: { source: "icon", name: "DoorOpen" },
        transitionType: "zoom",
        position: [190, 0, -9] as const,
        rotation: 0,
      },
      {
        id: "scene-5-to-scene-7",
        target: "scene_7",
        type: "icon",
        scale: 1.3,
        icon: { source: "icon", name: "CircleDot" },
        transitionType: "zoom",
        position: [-50, 5, 239] as const,
        rotation: 0,
      },
    ],
  },
  {
    id: "scene_6",
    name: "Smoking Room View",
    image: "/panoramas/scene-6.jpg",
    initialView: { yaw: 100 },
    hotspots: [
      {
        id: "scene-6-to-scene-5",
        target: "scene_5",
        type: "icon",
        scale: 1.3,
        icon: { source: "icon", name: "RotateCcw" },
        transitionType: "zoom",
        position: [200, 0, -55] as const,
        rotation: -60,
      },
    ],
  },
  {
    id: "scene_7",
    name: "Smoking Room View",
    image: "/panoramas/scene-7.jpg",
    initialView: { yaw: 100 },
    hotspots: [
      {
        id: "scene-7-to-scene-5",
        target: "scene_5",
        type: "navigation",
        transitionType: "zoom",
        position: [-400, -200, 90] as const,
        rotation: 200,
      },
    ],
  },
];

export const sceneKeys = scenesList.map((s) => s.id);
export const sceneLookup: Record<string, SceneData> = {};
for (const scene of scenesList) {
  sceneLookup[scene.id] = scene;
}

export function getScene(id: string): SceneData | undefined {
  return sceneLookup[id];
}

export function getNextScene(currentId: string): string {
  const idx = sceneKeys.indexOf(currentId);
  return sceneKeys[(idx + 1) % sceneKeys.length];
}
