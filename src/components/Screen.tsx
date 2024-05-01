import React from "react";
import { useLayersStore } from "../contexts/layersContext";
import { CompoundLayer } from "../model/compoundLayer";
import { normalize } from "../model/normalize";
import { BLUE, GREEN, RED } from "../model/color";

export const Screen = (): JSX.Element => {
  const store = useLayersStore();
  const { layer } = store[store.length - 1];
  const compoundLayer = layer as CompoundLayer;
  const layers = store.slice(0, -1).map((l) => l.layer);
  compoundLayer.layers = layers;
  const characters = normalize(layer.render());

  return (
    <div className="app-screen">
      <pre>
        {characters.map((c) => {
          const color = c.foregroundColor ?? undefined;
          const backgroundColor = c.backgroundColor ?? undefined;
          return (
            <span
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
