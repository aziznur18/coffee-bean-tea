"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { tourConfig } from "@/config/tour.config";
import { useTourStore } from "@/store/tour-store";
import TourNavbar from "./TourNavbar";

export default function TourUI({ children }: { children: React.ReactNode }) {
  const fadeOpacity = useTourStore((s) => s.fadeOpacity);
  const isTourReady = useTourStore((s) => s.isTourReady);

  return (
    <>
      <LoadingOverlay />
      <main className="isolate relative w-screen h-screen overflow-hidden bg-black">
        {children}
        <div
          className="pointer-events-none absolute inset-0 bg-black transition-opacity duration-75"
          style={{ opacity: fadeOpacity }}
        />
      </main>
      {isTourReady && <TourNavbar />}
    </>
  );
}

function LoadingOverlay() {
  const { active, progress } = useProgress();
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const onComplete = useTourStore((s) => s.setTourReady);
  const loading = tourConfig.loading;
  const theme = tourConfig.theme;

  useEffect(() => {
    if (!active && progress === 100) {
      const gpuPaintBuffer = setTimeout(() => {
        setIsFading(true);
        const unmountTimer = setTimeout(() => {
          setIsVisible(false);
          onComplete();
        }, loading.fadeDurationMs);
        return () => clearTimeout(unmountTimer);
      }, loading.gpuPaintBufferMs);
      return () => clearTimeout(gpuPaintBuffer);
    }
  }, [active, progress, onComplete, loading.fadeDurationMs, loading.gpuPaintBufferMs]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center ${loading.backgroundColor} overflow-hidden transition-opacity duration-1000 ease-in-out pointer-events-none ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl animate-pulse"
        style={{ backgroundColor: loading.glowColor }}
      />
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-white text-4xl font-bold tracking-[0.15em] uppercase">
          {loading.title}
        </h1>
        <p className="text-white/50 text-sm mt-2 tracking-[0.25em]">
          {loading.subtitle}
        </p>
      </div>
      <div className="relative z-10 mt-16">
        <div
          className={`${loading.spinnerSize} rounded-full border-[4px] animate-spin`}
          style={{
            borderColor: theme.spinnerBorder,
            borderTopColor: theme.spinnerAccent,
          }}
        />
      </div>
      <div className="relative z-10 mt-6 text-white/60 text-xs tracking-[0.2em] uppercase animate-pulse">
        {progress === 100
          ? loading.initializingText
          : `${loading.progressText} ${progress.toFixed(0)}%`}
      </div>
    </div>
  );
}
