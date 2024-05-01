import { MovableType } from "./movableType";
import { Coordinate } from "./coordinate";
import { Layer } from "./layer";
import { Type } from "./type";

export class CompoundLayer extends Layer {
  layers: Layer[];

  constructor(position: Coordinate, layers: Layer[]) {
    super();
    this.position = position;
    this.layers = layers;
    this.name = "Compound Layer";
  }

  public render(): MovableType[] {
    const screen: Map<string, Type> = new Map();
    this.layers.forEach((layer) => {
      layer.render().forEach(({ position, ...type }) => {
        screen.set(
          JSON.stringify({
            x: this.position.x + position.x,
            y: this.position.y + position.y,
          }),
          type
        );
      });
    });
    return Array.from(screen.entries()).map(
      ([position, type]): MovableType => ({
        position: JSON.parse(position),
        ...type,
      })
    );
  }
}
