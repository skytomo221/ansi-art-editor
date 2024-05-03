import { MovableType } from "./movableType";
import { ALPHA, BLUE, Color, GREEN, RED } from "./color";
import { Coordinate } from "./coordinate";

const sum = <T>(
  arr: T[],
  fn?: (value: T, index: number, array: T[]) => number
): number =>
  fn
    ? sum(arr.map(fn), undefined)
    : (arr as number[]).reduce((prev, current) => prev + current);

const average = <T>(
  arr: T[],
  fn?: (value: T, index: number, array: T[]) => number
) => sum(arr, fn) / arr.length;

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

const isTransparent = (color: Color) => color[ALPHA] < 0x7f;

export function renderImageLayer(
  offset: Coordinate,
  imagedata: null | ImageData,
  width: number,
  height: number
) {
  const color = (index: number) =>
    new Uint8ClampedArray([
      imagedata.data[index],
      imagedata.data[index + 1],
      imagedata.data[index + 2],
      imagedata.data[index + 3],
    ]);

  const dx = () => Math.round(imagedata.width / width);
  const dy = () => Math.round(imagedata.height / height);

  const average_color = (x: number, y: number) => {
    const index = (x: number, y: number) => (y * imagedata.width + x) * 4;
    const colors = range(x, x + dx(), 1)
      .map((x) => range(y, y + dy(), 1).map((y) => color(index(x, y))))
      .flat();
    return new Uint8ClampedArray([
      Math.round(average(colors, (color) => color[RED])),
      Math.round(average(colors, (color) => color[GREEN])),
      Math.round(average(colors, (color) => color[BLUE])),
      Math.round(average(colors, (color) => color[ALPHA])),
    ]);
  };

  const generate = () =>
    range(0, imagedata.height, dy())
      .map((y) =>
        range(0, imagedata.width, dx()).map((x) => average_color(x, y))
      )
      .filter((y) =>
        y.every(
          (x) =>
            !isNaN(x[RED]) &&
            !isNaN(x[BLUE]) &&
            !isNaN(x[GREEN]) &&
            !isNaN(x[ALPHA])
        )
      );

  if (!imagedata) return [];
  const generated = generate();
  let result: MovableType[] = [];
  for (let y = 0; y < generated.length; y += 2) {
    for (let x = 0; x < generated[y].length; x++) {
      const t = generated[y][x];
      const position = { x: offset.x + x, y: offset.y + y / 2 };
      if (y + 1 < generated.length) {
        const b = generated[y + 1][x];
        if (isTransparent(t) && isTransparent(b)) {
          result.push({ position, character: " " });
        } else if (isTransparent(t)) {
          result.push({ position, character: "▄", foregroundColor: b });
        } else if (isTransparent(b)) {
          result.push({ position, character: "▀", foregroundColor: t });
        } else {
          result.push({
            position,
            character: "▀",
            foregroundColor: t,
            backgroundColor: b,
          });
        }
      } else {
        result.push(
          isTransparent(t)
            ? { position, character: " " }
            : { position, character: "▀", foregroundColor: t }
        );
      }
    }
  }
  return result;
}
