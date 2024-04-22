import React from "react";
import { DragDropLayerList } from "./DragDropLayerList";
import { useLayersStore } from "../contexts/layersContext";
import { Card } from "@blueprintjs/core";
import { AddLayer } from "./AddLayer";
import { LayerListItem } from "./LayerListItem";

export const LayerList = (): JSX.Element => {
  const layers = useLayersStore();

  return (
    <div className="app-layer-list">
      <DragDropLayerList>
        <AddLayer />
        {layers.slice(0, -1).map(({ layer }, index) => (
          <LayerListItem
            key={JSON.stringify({ index, layer })}
            index={index}
            layer={layer}
          />
        ))}
        vvv vvv
        <Card>
          <strong>結果レイヤー</strong>
          <br />
          layers.slice(-1)[0].constructor.name
        </Card>
      </DragDropLayerList>
    </div>
  );
};