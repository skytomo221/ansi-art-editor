import React from "react";

import { useChildrenLayerStore } from "../contexts/childrenLayerContext";
import { CompoundLayer } from "../model/layer";
import { LayerListItem } from "./LayerListItem";
import { SortableLayers } from "./SortableLayers";
import DeleteLayer from "./DeleteLayer";

type Props = {
  layer: CompoundLayer;
};

export const CompoundLayerProperty = ({ layer }: Props): JSX.Element => {
  const store = useChildrenLayerStore();
  const children = store.filter((l) => l.parent === layer.id).reverse();

  return (
    <div>
      <SortableLayers parent={layer.id} empty={children.length === 0}>
        {children.map((layer, index) => (
          <LayerListItem key={layer.id} layer={layer} index={index} />
        ))}
      </SortableLayers>
      <DeleteLayer layerId={layer.id} />
    </div>
  );
};
