import React from "react";

import { useChildrenLayerStore } from "../contexts/childrenLayerContext";
import { CompoundLayer } from "../model/layer";
import { LayerListItem } from "./LayerListItem";
import { DroppableLayerList } from "./DroppableLayerList";

type Props = {
  layer: CompoundLayer;
};

export const CompoundLayerProperty = ({ layer }: Props): JSX.Element => {
  const store = useChildrenLayerStore();
  const children = store.filter((l) => l.parent === layer.id);

  return (
    <div>
      <DroppableLayerList compoundLayerId={layer.id}>
        <div>ここにドロップできるはずです</div>
        {children.map((layer, index) => (
          <LayerListItem key={layer.id} layer={layer} index={index} />
        ))}
      </DroppableLayerList>
    </div>
  );
};
