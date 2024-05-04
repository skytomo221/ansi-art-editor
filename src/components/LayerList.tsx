import React from "react";
import { DragDropLayerList } from "./DragDropLayerList";
import { useChildrenLayerStore } from "../contexts/childrenLayerContext";
import { Card } from "@blueprintjs/core";
import { AddLayer } from "./AddLayer";
import { LayerListItem } from "./LayerListItem";

export const LayerList = (): JSX.Element => {
  const layers = useChildrenLayerStore();

  return (
    <div className="app-layer-list">
      <DragDropLayerList>
        <AddLayer />
        <Card className="root-layer">
          <strong>結果レイヤー</strong>
          <br />
          {layers.map((layer) => (
            <LayerListItem key={layer.id} layer={layer} />
          ))}
        </Card>
      </DragDropLayerList>
    </div>
  );
};
