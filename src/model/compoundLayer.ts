import { CharacterWithPosition } from "./characterWithPosition";
import { Coordinate } from "./coordinate";
import { Layer } from "./layer";
import { Character } from "./character";

export class CompoundLayer extends Layer {
  layers: Layer[];

  constructor(position: Coordinate, layers: Layer[]) {
    super();
    this.position = position;
    this.layers = layers;
    this.name = "Compound Layer";
  }

  public render(): CharacterWithPosition[] {
    const screen: Map<string, Character> = new Map();
    this.layers.forEach((layer) => {
      layer.render().forEach(({ position, character }) => {
        screen.set(
          JSON.stringify({
            x: this.position.x + position.x,
            y: this.position.y + position.y,
          }),
          character
        );
      });
    });
    return Array.from(screen.entries()).map(
      ([position, character]): CharacterWithPosition => ({
        position: JSON.parse(position),
        character,
      })
    );
  }
}
