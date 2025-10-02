import { SMPTE_COLORS } from "../types/testcard";

export class SMPTEPatternRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Could not get 2D context from canvas");
    }
    this.ctx = context;
  }

  render(): void {
    const { width, height } = this.canvas;

    // Clear canvas
    this.ctx.fillStyle = SMPTE_COLORS.black;
    this.ctx.fillRect(0, 0, width, height);

    // Draw the three main sections
    this.drawTopColorBars(width, height);
    this.drawMiddleSection(width, height);
    this.drawBottomPLUGE(width, height);
  }

  private drawTopColorBars(width: number, height: number): void {
    const topHeight = height * 0.67; // Top 2/3 of the image
    const barWidth = width / 7;

    const colors = [
      SMPTE_COLORS.white,
      SMPTE_COLORS.yellow,
      SMPTE_COLORS.cyan,
      SMPTE_COLORS.green,
      SMPTE_COLORS.magenta,
      SMPTE_COLORS.red,
      SMPTE_COLORS.blue,
    ];

    colors.forEach((color, index) => {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(index * barWidth, 0, barWidth, topHeight);
    });
  }

  private drawMiddleSection(width: number, height: number): void {
    const topHeight = height * 0.67;
    const middleHeight = height * 0.08; // Small middle section
    const barWidth = width / 7;

    // Reverse blue bars with different intensities
    const colors = [
      SMPTE_COLORS.blue,
      SMPTE_COLORS.black,
      SMPTE_COLORS.magenta,
      SMPTE_COLORS.black,
      SMPTE_COLORS.cyan,
      SMPTE_COLORS.black,
      SMPTE_COLORS.white,
    ];

    colors.forEach((color, index) => {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(index * barWidth, topHeight, barWidth, middleHeight);
    });
  }

  private drawBottomPLUGE(width: number, height: number): void {
    const topHeight = height * 0.67;
    const middleHeight = height * 0.08;
    const bottomTop = topHeight + middleHeight;
    const bottomHeight = height - bottomTop;

    // PLUGE (Picture Line-Up Generation Equipment) pattern
    const segmentWidth = width / 12;

    // Left section: -I, +Q patterns
    this.ctx.fillStyle = "#0f0f23"; // -I
    this.ctx.fillRect(0, bottomTop, segmentWidth * 3, bottomHeight);

    // White reference
    this.ctx.fillStyle = SMPTE_COLORS.white2;
    this.ctx.fillRect(segmentWidth * 3, bottomTop, segmentWidth * 1, bottomHeight);

    // PLUGE bars (super black, black, white)
    this.ctx.fillStyle = SMPTE_COLORS.superBlack;
    this.ctx.fillRect(segmentWidth * 4, bottomTop, segmentWidth * 1.5, bottomHeight);

    this.ctx.fillStyle = SMPTE_COLORS.black2;
    this.ctx.fillRect(segmentWidth * 5.5, bottomTop, segmentWidth * 1, bottomHeight);

    this.ctx.fillStyle = SMPTE_COLORS.white2;
    this.ctx.fillRect(segmentWidth * 6.5, bottomTop, segmentWidth * 1, bottomHeight);

    this.ctx.fillStyle = SMPTE_COLORS.black2;
    this.ctx.fillRect(segmentWidth * 7.5, bottomTop, segmentWidth * 1.5, bottomHeight);

    // Right section: +Q
    this.ctx.fillStyle = "#230f23"; // +Q
    this.ctx.fillRect(segmentWidth * 9, bottomTop, segmentWidth * 3, bottomHeight);
  }
}
