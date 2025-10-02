export type AspectRatio = "16:9" | "4:3";

export interface TestcardConfig {
  aspectRatio: AspectRatio;
  text?: string;
  textColor: string;
  showTime: boolean;
  showDate: boolean;
  showBox: boolean;
  pattern: "smpte" | "custom";
}

export interface TestcardDimensions {
  width: number;
  height: number;
}

export interface SMPTEPattern {
  colorBars: string[];
  pluge: string[];
  whitePoint: string;
  blackPoint: string;
}

export const ASPECT_RATIOS: Record<AspectRatio, number> = {
  "16:9": 16 / 9,
  "4:3": 4 / 3,
};

export const DEFAULT_CONFIG: TestcardConfig = {
  aspectRatio: "16:9",
  textColor: "#ffffff",
  showTime: false,
  showDate: false,
  showBox: true,
  pattern: "smpte",
};

// SMPTE RP 219:2002 Standard Color Bars
export const SMPTE_COLORS = {
  // Top row (75% amplitude, 100% saturation)
  white: "#c0c0c0",
  yellow: "#c0c000",
  cyan: "#00c0c0",
  green: "#00c000",
  magenta: "#c000c0",
  red: "#c00000",
  blue: "#0000c0",

  // Middle row (reverse blue bars)
  darkBlue: "#0000c0",
  black: "#000000",
  darkMagenta: "#c000c0",
  darkBlack: "#000000",
  darkCyan: "#00c0c0",
  darkBlack2: "#000000",
  darkGray: "#c0c0c0",

  // Bottom row (PLUGE and reference levels)
  superBlack: "#000000",
  black2: "#101010",
  white2: "#eb8080",
  black3: "#101010",
} as const;
