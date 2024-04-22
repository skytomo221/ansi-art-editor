import { Character } from "./character";
import { CharacterWithPosition } from "./characterWithPosition";
import { Coordinate } from "./coordinate";
import { Layer } from "./layer";

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

type ColorWithAlpha = {
  red: number;
  green: number;
  blue: number;
  alpha: number;
};

const isTransparent = (color: ColorWithAlpha) => color.alpha < 0x7f;

export class ImageLayer extends Layer {
  imagedata: null | ImageData;
  width: number;
  height: number;

  constructor(
    name: string,
    position: Coordinate,
    imagedata: null | ImageData,
    width: number,
    height: number
  ) {
    super();
    this.position = position;
    this.name = name;
    this.imagedata = imagedata;
    this.width = width;
    this.height = height;
  }

  color(index: number): ColorWithAlpha {
    return {
      red: this.imagedata.data[index],
      green: this.imagedata.data[index + 1],
      blue: this.imagedata.data[index + 2],
      alpha: this.imagedata.data[index + 3],
    };
  }

  dx() {
    return Math.round(this.imagedata.width / this.width);
  }

  dy() {
    return Math.round(this.imagedata.height / this.height);
  }

  average_color(x: number, y: number) {
    const index = (x: number, y: number) => (y * this.imagedata.width + x) * 4;
    const colors = range(x, x + this.dx(), 1)
      .map((x) =>
        range(y, y + this.dy(), 1).map((y) => this.color(index(x, y)))
      )
      .flat();
    return {
      red: Math.round(average(colors, ({ red }) => red)),
      green: Math.round(average(colors, ({ green }) => green)),
      blue: Math.round(average(colors, ({ blue }) => blue)),
      alpha: Math.round(average(colors, ({ alpha }) => alpha)),
    };
  }

  generate() {
    return range(0, this.imagedata.height, this.dy())
      .map((y) =>
        range(0, this.imagedata.width, this.dx()).map((x) =>
          this.average_color(x, y)
        )
      )
      .filter((y) =>
        y.every(
          (x) =>
            !isNaN(x.red) &&
            !isNaN(x.blue) &&
            !isNaN(x.green) &&
            !isNaN(x.alpha)
        )
      );
  }

  public render(): CharacterWithPosition[] {
    if (!this.imagedata) return [];
    const generated = this.generate();
    let result = [];
    for (let y = 0; y < generated.length; y += 2) {
      for (let x = 0; x < generated[y].length; x++) {
        const t = generated[y][x];
        const position = { x: this.position.x + x, y: this.position.y + y / 2 };
        if (y + 1 < generated.length) {
          const b = generated[y + 1][x];
          if (isTransparent(t) && isTransparent(b)) {
            result.push({ position, character: new Character(" ") });
          } else if (isTransparent(t)) {
            result.push({
              position,
              character: new Character("▄", b),
            });
          } else if (isTransparent(b)) {
            result.push({
              position,
              character: new Character("▀", t),
            });
          } else {
            result.push({
              position,
              character: new Character("▀", t, b),
            });
          }
        } else {
          result.push(
            isTransparent(t)
              ? { position, character: new Character(" ") }
              : { position, character: new Character("▀", t) }
          );
        }
      }
    }
    return result;
  }
}
