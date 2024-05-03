import React from "react";
import { useChildrenLayerStore } from "../contexts/childrenLayerContext";
import { normalize } from "../model/normalize";
import { BLUE, GREEN, RED } from "../model/color";
import { renderCompoundLayer } from "../model/compoundLayer";

export const Screen = (): JSX.Element => {
  const layers = useChildrenLayerStore();
  const offset = { x: 0, y: 0 };
  const characters = normalize(renderCompoundLayer(offset, layers));

  return (
    <div className="app-screen">
      <pre>
        {characters.map((c) => {
          const color = c.foregroundColor ?? undefined;
          const backgroundColor = c.backgroundColor ?? undefined;
          return (
            <span
              key={JSON.stringify(c)}
              style={{
                backgroundColor:
                  backgroundColor === undefined
                    ? "unset"
                    : `rgb(${backgroundColor[RED]}, ${backgroundColor[GREEN]}, ${backgroundColor[BLUE]})`,
                color:
                  color === undefined
                    ? "unset"
                    : `rgb(${color[RED]}, ${color[GREEN]}, ${color[BLUE]})`,
              }}
            >
              {c.character}
            </span>
          );
        })}
      </pre>
    </div>
  );
};
