import { Character } from "./character";
import { CharacterWithPosition } from "./characterWithPosition";
import { Coordinate } from "./coordinate";
import { Layer } from "./layer";

export class TextLayer extends Layer {
  text: string;

  constructor(name: string, position: Coordinate, text: string) {
    super();
    this.position = position;
    this.name = name;
    this.text = text;
  }

  public render(): CharacterWithPosition[] {
    return this.text.split("").map(
      (character, index): CharacterWithPosition => ({
        position: {
          x: this.position.x + index,
          y: this.position.y,
        },
        character: new Character(character),
      })
    );
  }
}
