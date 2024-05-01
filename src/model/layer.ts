import { MovableType } from "./movableType";
import { Coordinate } from "./coordinate";

export abstract class Layer {
  name: string;
  position: Coordinate;

  public abstract render(): MovableType[];
}
