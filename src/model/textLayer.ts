import { MovableType } from "./movableType";
import { LayerBase } from "./layer";
import { Coordinate } from "./coordinate";

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

export function renderTextLayer(offset: Coordinate, text: string) {
  const characters = text.split("").map(
    (character, index): MovableType => ({
      position: {
        x: offset.x + index,
        y: offset.y,
      },
      character,
    })
  );
  return fixNewLinesPosition(characters);
}
