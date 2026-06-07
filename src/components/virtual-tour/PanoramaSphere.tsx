"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { tourConfig } from "@/config/tour.config";
import { sceneKeys, sceneLookup } from "@/config/scenes.config";

sceneKeys.forEach((key) => {
  useTexture.preload(sceneLookup[key].image);
});

export default function PanoramaSphere({ currentScene }: { currentScene: string }) {
  const textures = useTexture(sceneKeys.map((key) => sceneLookup[key].image));
  const { gl } = useThree();
  const perf = tourConfig.performance;

  useEffect(() => {
    textures.forEach((texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.x = -1;
      texture.offset.x = 1;
      texture.generateMipmaps = perf.generateMipmaps;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = gl.capabilities.getMaxAnisotropy();
      texture.needsUpdate = true;
    });
  }, [textures, gl, perf.generateMipmaps]);

  const textureMap = sceneKeys.reduce(
    (acc, key, index) => {
      acc[key] = textures[index];
      return acc;
    },
    {} as Record<string, THREE.Texture>,
  );

  const cam = tourConfig.camera;

  return (
    <mesh>
      <sphereGeometry args={[cam.sphereRadius, cam.sphereSegments, cam.sphereSegments]} />
      <meshBasicMaterial map={textureMap[currentScene]} side={THREE.BackSide} toneMapped={perf.toneMapped} />
    </mesh>
  );
}
