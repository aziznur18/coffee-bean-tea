"use client";

import Viewer from "@/components/virtual-tour/Viewer";
import TourUI from "@/components/virtual-tour/TourUI";

export default function HomePage() {
  return (
    <TourUI>
      <Viewer />
    </TourUI>
  );
}
