import { Type } from "./type";
import { MovableType } from "./movableType";
import { Coordinate } from "./coordinate";
import { Layer } from "./layer";

const fixNewLinesPosition = (characters: MovableType[]): MovableType[] =>
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
          prev.character === "\n"
            ? { x: acc[0].position.x, y: prev.position.y + 1 }
            : { x: prev.position.x + 1, y: prev.position.y },
      },
    ];
  }, [] as MovableType[]);

export class TextLayer extends Layer {
  text: string;

  constructor(name: string, position: Coordinate, text: string) {
    super();
    this.position = position;
    this.name = name;
    this.text = text;
  }

  public render(): MovableType[] {
    const characters = this.text
      .split("")
      .map((character, index): MovableType => {
        return {
          position: {
            x: this.position.x + index,
            y: this.position.y,
          },
          character,
        };
      });
    return fixNewLinesPosition(characters);
  }
}
