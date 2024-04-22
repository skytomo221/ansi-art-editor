import { CharacterWithPosition } from "./characterWithPosition";
import { Coordinate } from "./coordinate";

export abstract class Layer {
  name: string;
  position: Coordinate;

  public abstract render(): CharacterWithPosition[];
}
