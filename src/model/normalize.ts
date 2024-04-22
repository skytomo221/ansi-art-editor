import { Character } from "./character";
import { CharacterWithPosition } from "./characterWithPosition";

function sort(characters: CharacterWithPosition[]) {
  const result = [...characters];
  result.sort((a, b) => {
    if (a.position.y === b.position.y) {
      return a.position.x - b.position.x;
    }
    return a.position.y - b.position.y;
  });
  return result;
}

const newLine = "\n";

const range = (start: number, stop: number) =>
  Array.from({ length: stop - start }, (_, i) => start + i);

function offsetHead(characters: CharacterWithPosition[]) {
  return characters.length === 0
    ? characters
    : [
        ...range(0, characters[0].position.y).map((y) => ({
          position: { x: 0, y },
          character: new Character(newLine),
        })),
        ...characters,
      ];
}

function padNewLines(characters: CharacterWithPosition[]) {
  return characters.reduce((acc, character, i) => {
    if (i === 0) {
      return [character];
    }
    const prev = characters[i - 1];
    if (
      prev.position.y !== character.position.y &&
      character.character.character !== newLine
    ) {
      return [
        ...acc,
        {
          position: { x: prev.position.x, y: prev.position.y + 1 },
          character: new Character(newLine),
        },
        ...range(prev.position.y + 1, character.position.y).map((y) => ({
          position: { x: 0, y },
          character: new Character(newLine),
        })),
        character,
      ];
    }
    return [...acc, character];
  }, [] as CharacterWithPosition[]);
}

function padSpaces(characters: CharacterWithPosition[]) {
  return characters.reduce((acc, character, i) => {
    if (i === 0) {
      return [character];
    }
    const prev = characters[i - 1];
    if (
      prev.position.y === character.position.y &&
      prev.position.x + 1 < character.position.x
    ) {
      return [
        ...acc,
        ...range(prev.position.x, character.position.x).map((x) => ({
          position: { x, y: prev.position.y },
          character: new Character(" "),
        })),
        character,
      ];
    }
    return [...acc, character];
  }, [] as CharacterWithPosition[]);
}

export function normalize(
  characters: CharacterWithPosition[]
): CharacterWithPosition[] {
  return padSpaces(padNewLines(offsetHead(sort(characters))));
}