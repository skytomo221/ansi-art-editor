import React from "react";
import { Button } from "@blueprintjs/core";
import { useChildrenLayerStore } from "../contexts/childrenLayerContext";
import { renderCompoundLayer } from "../model/compoundLayer";
import { normalize } from "../model/normalize";
import { BLUE, Color, GREEN, RED } from "../model/color";

const copyToClipboard = async (text: string) => {
  await global.navigator.clipboard.writeText(text);
};

const Clipboard = (): JSX.Element => {
  const store = useChildrenLayerStore();
  const handleCopy = () => {
    const layers = store.filter((l) => l.parent === 0);
    const offset = { x: 0, y: 0 };
    const characters = normalize(renderCompoundLayer(offset, layers));
    const toAnsi24bitColor = (
      type: "foreground" | "background",
      color: Color
    ) => {
      if (!color) return "";
      const mode = type === "foreground" ? 38 : 48;
      return `\x1b[${mode};2;${color[RED]};${color[GREEN]};${color[BLUE]}m`;
    };
    const text = characters
      .map(
        ({ foregroundColor, backgroundColor, character }) =>
          `${toAnsi24bitColor("foreground", foregroundColor)}${toAnsi24bitColor("background", backgroundColor)}${character}\x1b[9m`
      )
      .join("");
    copyToClipboard(text);
  };

  return (
    <Button intent="primary" icon="clipboard" onClick={handleCopy}>
      結果をコピーする
    </Button>
  );
};

export default Clipboard;
