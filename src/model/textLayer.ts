import { Character } from "./character";
import { CharacterWithPosition } from "./characterWithPosition";
import { Coordinate } from "./coordinate";
import { Layer } from "./layer";

const fixNewLinesPosition = (
  characters: CharacterWithPosition[]
): CharacterWithPosition[] =>
  characters.reduce((acc, character, i) => {
    if (i === 0) {
      return [character];
    }
    const prev = acc[i - 1];
    return [
      ...acc,
      {
        ...character,
        position:
          prev.character.character === "\n"
            ? { x: acc[0].position.x, y: prev.position.y + 1 }
            : { x: prev.position.x + 1, y: prev.position.y },
      },
    ];
  }, [] as CharacterWithPosition[]);

export class TextLayer extends Layer {
  text: string;

  constructor(name: string, position: Coordinate, text: string) {
    super();
    this.position = position;
    this.name = name;
    this.text = text;
  }

  public render(): CharacterWithPosition[] {
    const characters = this.text
      .split("")
      .map((character, index): CharacterWithPosition => {
        return {
          position: {
            x: this.position.x + index,
            y: this.position.y,
          },
          character: new Character(character),
        };
      });
    return fixNewLinesPosition(characters);
  }
}
