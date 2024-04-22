import { Character } from "./character";
import { Coordinate } from "./coordinate";

export type CharacterWithPosition = {
  position: Coordinate;
  character: Character;
};
