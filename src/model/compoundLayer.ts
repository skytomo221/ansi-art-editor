import { MovableType } from "./movableType";
import { LayerBase } from "./layer";
import { Type } from "./type";
import { Coordinate } from "./coordinate";

export function renderCompoundLayer(offset: Coordinate, layers: LayerBase[]) {
  const screen: Map<string, Type> = new Map();
  layers.forEach((layer) => {
    layer.result.forEach(({ position, ...type }) => {
      screen.set(
        JSON.stringify({
          x: offset.x + position.x,
          y: offset.y + position.y,
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
