import React from "react";
import { useChildrenLayerStore } from "../contexts/childrenLayerContext";
import { Card } from "@blueprintjs/core";
import { AddLayer } from "./AddLayer";
import { LayerListItem } from "./LayerListItem";
import { SortableLayers } from "./SortableLayers";

export const LayerList = (): JSX.Element => {
  const store = useChildrenLayerStore();
  const children = store.filter((l) => l.parent === 0);

  return (
    <div className="app-layer-list">
      <AddLayer />
      <Card className="root-layer">
        <strong>結果レイヤー</strong>
        <br />
        <SortableLayers parent={0}>
          {children.map((layer, index) => (
            <LayerListItem key={layer.id} layer={layer} index={index} />
          ))}
        </SortableLayers>
      </Card>
    </div>
  );
};
