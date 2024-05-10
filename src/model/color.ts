import { RGBColor, closest } from "color-diff";

export const namedColor = [
  "BLACK",
  "RED",
  "GREEN",
  "BLUE",
  "YELLOW",
  "CYAN",
  "MAGENTA",
  "WHITE",
  "BRIGHT_BLACK",
  "BRIGHT_RED",
  "BRIGHT_GREEN",
  "BRIGHT_BLUE",
  "BRIGHT_YELLOW",
  "BRIGHT_CYAN",
  "BRIGHT_MAGENTA",
  "BRIGHT_WHITE",
] as const;

export type NamedColor = (typeof namedColor)[number];
export type Color = NamedColor | Uint8ClampedArray;

export const RED = 0;
export const GREEN = 1;
export const BLUE = 2;
export const ALPHA = 3;

export const colorCode3bit = [
  { R: 0, G: 0, B: 0 },
  { R: 128, G: 0, B: 0 },
  { R: 0, G: 128, B: 0 },
  { R: 128, G: 128, B: 0 },
  { R: 0, G: 0, B: 128 },
  { R: 128, G: 0, B: 128 },
  { R: 0, G: 128, B: 128 },
  { R: 192, G: 192, B: 192 },
];

export const colorCode3bitBright = [
  { R: 128, G: 128, B: 128 },
  { R: 255, G: 0, B: 0 },
  { R: 0, G: 255, B: 0 },
  { R: 255, G: 255, B: 0 },
  { R: 0, G: 0, B: 255 },
  { R: 255, G: 0, B: 255 },
  { R: 0, G: 255, B: 255 },
  { R: 255, G: 255, B: 255 },
];

export const colorCode4bit = [...colorCode3bit, ...colorCode3bitBright];

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
const step6 = range(0, 255, 51);
const step24 = range(8, 238, 10);

export const colorCode8bit = [
  step6
    .map((r) =>
      step6.map((g) => step6.map((b) => ({ R: r, G: g, B: b }))).flat()
    )
    .flat(),
  step24.map((l) => ({ R: l, G: l, B: l })),
].flat();

export function closestColor(
  color: Color | undefined,
  palette: RGBColor[]
): Color | undefined {
  if (typeof color === "string") return color;
  if (color === undefined) return undefined;
  const result = closest(
    { R: color[RED], G: color[GREEN], B: color[BLUE] },
    palette
  );
  return new Uint8ClampedArray([result.R, result.G, result.B]);
}
