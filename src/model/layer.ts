import { Coordinate } from "./coordinate";
import { MovableType } from "./movableType";

export type LayerBase = {
  id: number;
  type: string;
  name: string;
  isOpen: boolean;
  offset: Coordinate;
  parent: number;
  result: MovableType[];
};

export type Layer = TextLayer | ImageLayer | CompoundLayer;

export type TextLayer = LayerBase & {
  type: "text";
  text: string;
}

export type ImageLayer = LayerBase & {
  type: "image";
  offset: Coordinate;
  imagedata: null | ImageData;
  width: number;
  height: number;
};

export type CompoundLayer = LayerBase & {
  type: "compound";
};
