import React from "react";
import { Button, MenuItem } from "@blueprintjs/core";
import { useChildrenLayerStore } from "../contexts/childrenLayerContext";
import { renderCompoundLayer } from "../model/compoundLayer";
import { normalize } from "../model/normalize";
import {
  BLUE,
  Color,
  GREEN,
  RED,
  closestColor,
  colorCode3bit,
  colorCode3bitBright,
  colorCode4bit,
  colorCode8bit,
} from "../model/color";
import { MovableType, convertBit } from "../model/movableType";
import { ItemRendererProps, Select } from "@blueprintjs/select";
import {
  colorModes,
  useRootLayerDispatch,
  useRootLayerStore,
} from "../contexts/rootLayerContext";

const copyToClipboard = async (text: string) => {
  await global.navigator.clipboard.writeText(text);
};

function toAnsi24bitColor(type: "foreground" | "background", color: Color) {
  if (!color) return "";
  const mode = type === "foreground" ? 38 : 48;
  return `\x1b[${mode};2;${color[RED]};${color[GREEN]};${color[BLUE]}m`;
}

type MovableTypeState = {
  foregroundColor?: Color;
  backgroundColor?: Color;
  text: string;
};

function colorsAreEqual(a?: Color, b?: Color) {
  console.log(a, b);
  return a === undefined || b === undefined
    ? a === b
    : a[RED] === b[RED] && a[GREEN] === b[GREEN] && a[BLUE] === b[BLUE];
}

function toText(movableTypes: MovableType[]) {
  return movableTypes.reduce<MovableTypeState>(
    (acc, { foregroundColor, backgroundColor, character }) => {
      if (character === "\n") {
        if (acc.backgroundColor !== undefined) {
          acc.backgroundColor = undefined;
          acc.text += "\x1b[49m";
        }
        acc.text += "\n";
        return acc;
      }
      if (!colorsAreEqual(acc.foregroundColor, foregroundColor)) {
        if (foregroundColor === undefined) {
          acc.foregroundColor = undefined;
          acc.text += "\x1b[39m";
        } else {
          acc.foregroundColor = foregroundColor;
          acc.text += toAnsi24bitColor("foreground", foregroundColor);
        }
      }
      if (!colorsAreEqual(acc.backgroundColor, backgroundColor)) {
        if (backgroundColor === undefined) {
          acc.backgroundColor = undefined;
          acc.text += "\x1b[49m";
        } else {
          acc.backgroundColor = backgroundColor;
          acc.text += toAnsi24bitColor("background", backgroundColor);
        }
      }
      acc.text += character;
      return acc;
    },
    {
      text: "",
    }
  ).text;
}

const Clipboard = (): JSX.Element => {
  const store = useChildrenLayerStore();
  const dispatch = useRootLayerDispatch();
  const { colorMode } = useRootLayerStore();
  const setColorMode = (colorMode: (typeof colorModes)[number]) => {
    dispatch({ type: "UPDATE_COLOR_MODE", colorMode });
  };
  const handleCopy = () => {
    const layers = store.filter((l) => l.parent === 0);
    const offset = { x: 0, y: 0 };
    copyToClipboard(
      toText(
        convertBit(normalize(renderCompoundLayer(offset, layers)), colorMode)
      )
    );
  };

  return (
    <div>
      <Select
        items={colorModes}
        itemRenderer={function (
          item: unknown,
          itemProps: ItemRendererProps<HTMLLIElement>
        ): React.JSX.Element {
          return (
            <MenuItem
              key={itemProps.index}
              text={item.toString()}
              onClick={itemProps.handleClick}
            />
          );
        }}
        onItemSelect={setColorMode}
      >
        <Button icon="style" text={colorMode} />
      </Select>
      <Button intent="primary" icon="clipboard" onClick={handleCopy}>
        結果をコピーする
      </Button>
    </div>
  );
};

export default Clipboard;
