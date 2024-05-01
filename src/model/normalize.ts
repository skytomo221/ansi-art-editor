import { MovableType } from "./movableType";

function sort(characters: MovableType[]) {
  const result = [...characters];
  result.sort((a, b) => {
    if (a.position.y === b.position.y) {
      return a.position.x - b.position.x;
    }
    return a.position.y - b.position.y;
  });
  return result;
}

const newLine = { character: "\n" };

function removeNewLines(moveableTypes: MovableType[]): MovableType[] {
  return moveableTypes.filter(
    (movableType) => movableType.character !== newLine.character
  );
}

const range = (start: number, stop: number) =>
  Array.from({ length: stop - start }, (_, i) => start + i);

function offsetHead(movableTypes: MovableType[]): MovableType[] {
  return movableTypes.length === 0
    ? movableTypes
    : [
        ...range(0, movableTypes[0].position.y).map((y) => ({
          position: { x: 0, y },
          ...newLine,
        })),
        ...movableTypes,
      ];
}

function padNewLines(movableTypes: MovableType[]): MovableType[] {
  return movableTypes.reduce((acc, movableType, i) => {
    if (i === 0) {
      return [movableType];
    }
    const prev = movableTypes[i - 1];
    if (
      prev.position.y !== movableType.position.y &&
      prev.character !== newLine.character
    ) {
      return [
        ...acc,
        {
          position: { x: prev.position.x + 1, y: prev.position.y },
          ...newLine,
        },
        ...range(prev.position.y + 1, movableType.position.y).map((y) => ({
          position: { x: 0, y },
          ...newLine,
        })),
        movableType,
      ];
    }
    return [...acc, movableType];
  }, [] as MovableType[]);
}

function padSpaces(movableTypes: MovableType[]): MovableType[] {
  return movableTypes.reduce((acc, movableType, i) => {
    if (i === 0) {
      return [
        ...range(0, movableType.position.x).map((x) => ({
          position: { x, y: 0 },
          character: " ",
        })),
        movableType,
      ];
    }
    const prev = movableTypes[i - 1];
    if (
      prev.position.y === movableType.position.y &&
      prev.position.x + 1 < movableType.position.x
    ) {
      return [
        ...acc,
        ...range(prev.position.x + 1, movableType.position.x).map((x) => ({
          position: { x, y: movableType.position.y },
          character: " ",
        })),
        movableType,
      ];
    } else if (
      prev.position.y + 1 === movableType.position.y &&
      0 < movableType.position.x
    ) {
      return [
        ...acc,
        ...range(0, movableType.position.x).map((x) => ({
          position: { x, y: movableType.position.y },
          character: " ",
        })),
        movableType,
      ];
    }
    return [...acc, movableType];
  }, [] as MovableType[]);
}

export function normalize(movableTypes: MovableType[]): MovableType[] {
  return padSpaces(padNewLines(offsetHead(sort(removeNewLines(movableTypes)))));
}
