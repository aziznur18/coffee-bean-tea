"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { tourConfig } from "@/config/tour.config";
import { sceneKeys, sceneLookup } from "@/config/scenes.config";
import { useTourStore } from "@/store/tour-store";

export default function PanoramaSphere({ currentScene }: { currentScene: string }) {
  const textures = useTexture(sceneKeys.map((key) => sceneLookup[key].image));
  const { gl } = useThree();
  const perf = tourConfig.performance;

  const nextScene = useTourStore((s) => s.nextScene);
  const fadeOpacity = useTourStore((s) => s.fadeOpacity);
  const transitionType = useTourStore((s) => s.transitionType);

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.x = -1;
      texture.offset.x = 1;
      texture.generateMipmaps = perf.generateMipmaps;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = 4;
      texture.needsUpdate = true;
    });
  }, [textures, gl, perf.generateMipmaps]);

  const textureMap = useMemo(
    () =>
      sceneKeys.reduce(
        (acc, key, index) => {
          acc[key] = textures[index];
          return acc;
        },
        {} as Record<string, THREE.Texture>,
      ),
    [textures],
  );

  const cam = tourConfig.camera;
  const needNext = nextScene && nextScene !== currentScene;
  const isCrossFading = !!(transitionType === "fade" && needNext && fadeOpacity < 1);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[cam.sphereRadius, cam.sphereSegments, cam.sphereSegments]} />
        <meshBasicMaterial
          map={textureMap[currentScene]}
          side={THREE.BackSide}
          toneMapped={perf.toneMapped}
          transparent={isCrossFading}
          opacity={isCrossFading ? fadeOpacity : 1}
        />
      </mesh>

      {isCrossFading && (
        <mesh>
          <sphereGeometry args={[cam.sphereRadius, cam.sphereSegments, cam.sphereSegments]} />
          <meshBasicMaterial
            map={textureMap[nextScene]}
            side={THREE.BackSide}
            toneMapped={perf.toneMapped}
            transparent
            opacity={1 - fadeOpacity}
          />
        </mesh>
      )}
    </group>
  );
}
