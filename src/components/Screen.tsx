import React, { FocusEvent } from "react";
import { useLayersDispatch, useLayersStore } from "../contexts/layersContext";
import { Character } from "../model/character";
import { CompoundLayer } from "../model/compoundLayer";
import { normalize } from "../model/normalize";

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
          const color = c.character.foregroundColor;
          const backgroundColor = c.character.backgroundColor;
          return (
            <span
              style={{
                backgroundColor:
                  "default" in backgroundColor
                    ? "unset"
                    : `rgb(${backgroundColor.red}, ${backgroundColor.green}, ${backgroundColor.blue})`,
                color:
                  "default" in color
                    ? "unset"
                    : `rgb(${color.red}, ${color.green}, ${color.blue})`,
              }}
            >
              {c.character.character}
            </span>
          );
        })}
      </pre>
    </div>
  );
};
