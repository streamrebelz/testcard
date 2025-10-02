import { useEffect, useRef } from "preact/hooks";
import type { TestcardConfig, TestcardDimensions } from "../types/testcard";
import { ASPECT_RATIOS } from "../types/testcard";
import { SMPTEPatternRenderer } from "../utils/smpte-renderer";

interface TestcardRendererProps {
  config: TestcardConfig;
  dimensions?: TestcardDimensions;
  className?: string;
}

export function TestcardRenderer({
  config,
  dimensions,
  className,
}: TestcardRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const aspectRatio = ASPECT_RATIOS[config.aspectRatio];
    let width: number, height: number;

    if (dimensions) {
      width = dimensions.width;
      height = dimensions.height;
    } else {
      // Default dimensions for preview
      width = 640;
      height = width / aspectRatio;
    }

    canvas.width = width;
    canvas.height = height;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Render SMPTE pattern
      const smpteRenderer = new SMPTEPatternRenderer(canvas);
      smpteRenderer.render();

      // Render text overlay
      if (config.text) {
        renderText(
          ctx,
          config.text,
          config.textColor,
          config.showBox,
          width,
          height
        );
      }

      // Render date and time if enabled
      if (config.showDate || config.showTime) {
        renderDateTime(
          ctx,
          config.textColor,
          config.showBox,
          config.showDate,
          config.showTime,
          width,
          height
        );
      }

      // Continue animation if time or date is enabled
      if (config.showTime || config.showDate) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [config, dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}

function renderText(
  ctx: CanvasRenderingContext2D,
  text: string,
  color: string,
  showBox: boolean,
  width: number,
  height: number
): void {
  const fontSize = Math.max(24, width / 20);
  ctx.font = `bold ${fontSize}px Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const textMetrics = ctx.measureText(text);
  const textWidth = textMetrics.width;
  const textHeight = fontSize;

  const x = width / 2;
  const y = height / 2;

  // Draw box background if enabled
  if (showBox) {
    const padding = fontSize * 0.3;
    ctx.fillStyle = "rgba(0, 0, 0, 1)";
    ctx.fillRect(
      x - textWidth / 2 - padding,
      y - textHeight / 2 - padding,
      textWidth + padding * 2,
      textHeight + padding * 2
    );
  }

  // Draw text
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function renderDateTime(
  ctx: CanvasRenderingContext2D,
  color: string,
  showBox: boolean,
  showDate: boolean,
  showTime: boolean,
  width: number,
  height: number
): void {
  const now = new Date();
  const fontSize = Math.max(20, width / 25);
  ctx.font = `bold ${fontSize}px monospace`;
  ctx.textBaseline = "bottom";

  const bottomMargin = fontSize * 1.5; // Distance from bottom edge
  const sideMargin = fontSize; // Distance from side edges

  if (showDate && showTime) {
    // Both date and time: date on left, time on right
    const dateString = now.toISOString().split("T")[0]; // YYYY-MM-DD format
    const timeString = now.toTimeString().split(" ")[0]; // HH:MM:SS format

    // Render date (bottom left)
    ctx.textAlign = "left";
    const dateMetrics = ctx.measureText(dateString);
    const dateX = sideMargin;
    const dateY = height - bottomMargin;

    if (showBox) {
      const padding = fontSize * 0.3;
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(
        dateX - padding,
        dateY - fontSize - padding,
        dateMetrics.width + padding * 2,
        fontSize + padding * 2
      );
    }

    ctx.fillStyle = color;
    ctx.fillText(dateString, dateX, dateY);

    // Render time (bottom right)
    ctx.textAlign = "right";
    const timeMetrics = ctx.measureText(timeString);
    const timeX = width - sideMargin;
    const timeY = height - bottomMargin;

    if (showBox) {
      const padding = fontSize * 0.3;
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(
        timeX - timeMetrics.width - padding,
        timeY - fontSize - padding,
        timeMetrics.width + padding * 2,
        fontSize + padding * 2
      );
    }

    ctx.fillStyle = color;
    ctx.fillText(timeString, timeX, timeY);
  } else if (showDate) {
    // Only date: centered at bottom
    const dateString = now.toISOString().split("T")[0]; // YYYY-MM-DD format
    ctx.textAlign = "center";
    const dateMetrics = ctx.measureText(dateString);
    const x = width / 2;
    const y = height - bottomMargin;

    if (showBox) {
      const padding = fontSize * 0.3;
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(
        x - dateMetrics.width / 2 - padding,
        y - fontSize - padding,
        dateMetrics.width + padding * 2,
        fontSize + padding * 2
      );
    }

    ctx.fillStyle = color;
    ctx.fillText(dateString, x, y);
  } else if (showTime) {
    // Only time: centered at bottom (legacy behavior for time-only)
    const timeString = now.toTimeString().split(" ")[0]; // HH:MM:SS format
    ctx.textAlign = "center";
    const timeMetrics = ctx.measureText(timeString);
    const x = width / 2;
    const y = height - bottomMargin;

    if (showBox) {
      const padding = fontSize * 0.3;
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(
        x - timeMetrics.width / 2 - padding,
        y - fontSize - padding,
        timeMetrics.width + padding * 2,
        fontSize + padding * 2
      );
    }

    ctx.fillStyle = color;
    ctx.fillText(timeString, x, y);
  }
}
