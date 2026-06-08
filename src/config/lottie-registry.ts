import navigationArrow from "@/../public/lottie/navigation-arrow.json";

const registry: Record<string, unknown> = {
  "navigation-arrow": navigationArrow,
};

export function getLottieAnimation(name: string): unknown | undefined {
  return registry[name];
}
