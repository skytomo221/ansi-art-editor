import React from "react";
import { DragDropLayerList } from "./DragDropLayerList";
import { useChildrenLayerStore } from "../contexts/childrenLayerContext";
import { Card } from "@blueprintjs/core";
import { AddLayer } from "./AddLayer";
import { LayerListItem } from "./LayerListItem";
import { DroppableLayerList } from "./DroppableLayerList";

export const LayerList = (): JSX.Element => {
  const layers = useChildrenLayerStore();

  return (
    <div className="app-layer-list">
      <DragDropLayerList>
        <AddLayer />
        <Card className="root-layer">
          <strong>結果レイヤー</strong>
          <br />
          <DroppableLayerList compoundLayerId={0}>
            {layers
              .filter((layer) => layer.parent === 0)
              .map((layer, index) => (
                <LayerListItem key={layer.id} layer={layer} index={index} />
              ))}
          </DroppableLayerList>
        </Card>
      </DragDropLayerList>
    </div>
  );
};
