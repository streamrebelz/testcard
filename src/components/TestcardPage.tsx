import { useEffect, useState } from "preact/hooks";
import type { TestcardConfig, AspectRatio } from "../types/testcard";
import { DEFAULT_CONFIG } from "../types/testcard";
import { TestcardRenderer } from "./TestcardRenderer";

export function TestcardPage() {
  const [config, setConfig] = useState<TestcardConfig>(DEFAULT_CONFIG);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    const newConfig: TestcardConfig = {
      aspectRatio: (urlParams.get("aspectRatio") as AspectRatio) || DEFAULT_CONFIG.aspectRatio,
      text: urlParams.get("text") || undefined,
      textColor: urlParams.get("textColor")
        ? `#${urlParams.get("textColor")}`
        : DEFAULT_CONFIG.textColor,
      showTime: urlParams.get("showTime") === "true",
      showDate: urlParams.get("showDate") === "true",
      showBox: urlParams.get("showBox") !== "false", // Default to true unless explicitly false
      pattern: "smpte", // Always use SMPTE pattern
    };

    setConfig(newConfig);

    // Calculate full-screen dimensions
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const aspectRatio = newConfig.aspectRatio === "16:9" ? 16 / 9 : 4 / 3;

      let width, height;

      if (screenWidth / screenHeight > aspectRatio) {
        // Screen is wider than needed, fit to height
        height = screenHeight;
        width = height * aspectRatio;
      } else {
        // Screen is taller than needed, fit to width
        width = screenWidth;
        height = width / aspectRatio;
      }

      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div className="testcard-page">
      <div className="testcard-container">
        <TestcardRenderer
          config={config}
          dimensions={dimensions}
          className="testcard-canvas"
        />
      </div>
    </div>
  );
}
