export interface HotspotData {
  id: string;
  target: string;
  variant: string;
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
    image: "/panoramas/scene-1.webp",
    initialView: { yaw: 80 },
    hotspots: [
      {
        id: "scene-1-to-scene-2",
        target: "scene_2",
        variant: "portal",
        transitionType: "fade",
        position: [-400, -60, -65] as const,
        rotation: 90,
      },
    ],
  },
  {
    id: "scene_2",
    name: "Lantai 1",
    image: "/panoramas/scene-2.webp",
    initialView: { yaw: 100 },
    hotspots: [
      {
        id: "scene-2-to-scene-3",
        target: "scene_3",
        variant: "stair-up",
        transitionType: "fade",
        position: [65, -20, 400] as const,
        rotation: 180,
      },
      {
        id: "scene-2-to-scene-1",
        target: "scene_1",
        variant: "portal",
        transitionType: "fade",
        position: [-170, -40, -400] as const,
        rotation: 180,
      },
    ],
  },
  {
    id: "scene_3",
    name: "Lantai 2 Tangga",
    image: "/panoramas/scene-3.webp",
    initialView: { yaw: 60 },
    hotspots: [
      {
        id: "scene-3-to-scene-4",
        target: "scene_4",
        variant: "navigation",
        transitionType: "zoom",
        position: [-150, -250, -400] as const,
        rotation: 120,
      },
      {
        id: "scene-3-to-scene-2",
        target: "scene_2",
        variant: "stair-down",
        transitionType: "fade",
        position: [-400, -250, 0] as const,
        rotation: -60,
      },
    ],
  },
  {
    id: "scene_4",
    name: "No Smoking Room",
    image: "/panoramas/scene-4.webp",
    initialView: { yaw: 240 },
    hotspots: [
      {
        id: "scene-4-to-scene-3",
        target: "scene_3",
        variant: "navigation",
        transitionType: "zoom",
        position: [140, -350, 500] as const,
        rotation: -60,
      },
      {
        id: "scene-4-to-scene-5",
        target: "scene_5",
        variant: "portal",
        transitionType: "fade",
        position: [35, -100, -500] as const,
        rotation: -60,
      },
    ],
  },
  {
    id: "scene_5",
    name: "Smoking Room",
    image: "/panoramas/scene-5.webp",
    initialView: { yaw: 230 },
    hotspots: [
      {
        id: "scene-5-to-scene-4",
        target: "scene_4",
        variant: "portal",
        transitionType: "fade",
        position: [25, -80, 500] as const,
        rotation: -60,
      },
      {
        id: "scene-5-to-scene-6",
        target: "scene_6",
        variant: "binocular",
        transitionType: "zoom",
        position: [-35, -40, -500] as const,
        rotation: -60,
      },
    ],
  },
  {
    id: "scene_6",
    name: "Smoking Room View",
    image: "/panoramas/scene-6.webp",
    initialView: { yaw: -120 },
    hotspots: [
      {
        id: "scene-6-to-scene-4",
        target: "scene_4",
        variant: "portal",
        transitionType: "fade",
        position: [-100, 0, 0] as const,
        rotation: -60,
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
