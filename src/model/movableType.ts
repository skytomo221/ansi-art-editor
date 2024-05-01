import { Type } from "./type";
import { Coordinate } from "./coordinate";

export type MovableType = Type & {
  position: Coordinate;
};
