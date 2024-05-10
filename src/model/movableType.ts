import { Type } from "./type";
import { Coordinate } from "./coordinate";
import { colorModes } from "../contexts/rootLayerContext";
import { closestColor, colorCode3bit, colorCode3bitBright, colorCode4bit, colorCode8bit } from "./color";

export type MovableType = Type & {
  position: Coordinate;
};

export const convertBit = (
  movableTypes: MovableType[],
  colorMode: (typeof colorModes)[number]
) => {
  return movableTypes.map((movableType) => {
    switch (colorMode) {
      case "3-bit":
        return {
          ...movableType,
          foregroundColor: closestColor(
            movableType.foregroundColor,
            colorCode3bit
          ),
          backgroundColor: closestColor(
            movableType.backgroundColor,
            colorCode3bit
          ),
        };
      case "3-bit (bright)":
        return {
          ...movableType,
          foregroundColor: closestColor(
            movableType.foregroundColor,
            colorCode3bitBright
          ),
          backgroundColor: closestColor(
            movableType.backgroundColor,
            colorCode3bitBright
          ),
        };
      case "4-bit":
        return {
          ...movableType,
          foregroundColor: closestColor(
            movableType.foregroundColor,
            colorCode4bit
          ),
          backgroundColor: closestColor(
            movableType.backgroundColor,
            colorCode4bit
          ),
        };
      case "8-bit":
        return {
          ...movableType,
          foregroundColor: closestColor(
            movableType.foregroundColor,
            colorCode8bit
          ),
          backgroundColor: closestColor(
            movableType.backgroundColor,
            colorCode8bit
          ),
        };
      default:
        return movableType;
    }
  });
};
