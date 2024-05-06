import React from "react";
import { useChildrenLayerStore } from "../contexts/childrenLayerContext";
import { Button, Card } from "@blueprintjs/core";
import { AddLayer } from "./AddLayer";
import { LayerListItem } from "./LayerListItem";
import { SortableLayers } from "./SortableLayers";
import Clipboard from "./Clipboard";

export const LayerList = (): JSX.Element => {
  const store = useChildrenLayerStore();
  const children = store.filter((l) => l.parent === 0).reverse();

  return (
    <div className="app-layer-list">
      <AddLayer />
      <Card className="root-layer">
        <h2>結果レイヤー</h2>
        <Clipboard />
        <SortableLayers parent={0}>
          {children.map((layer, index) => (
            <LayerListItem key={layer.id} layer={layer} index={index} />
          ))}
        </SortableLayers>
      </Card>
    </div>
  );
};
