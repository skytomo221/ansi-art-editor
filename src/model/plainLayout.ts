import { Coordinate } from "./coordinate";
import { MovableType } from "./movableType";

export type PlainLayout = {
  type: string;
  size: Coordinate;
  position: Coordinate;
  movableTypes: MovableType[];
} & (PlainTextLayout);

export type PlainTextLayout = {
  type: "TEXT";
  text: string;
};

export type ImageLayout = {
  type: "IMAGE";
  image: HTMLImageElement;
};
