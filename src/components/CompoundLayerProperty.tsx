import React from "react";

import {
  useChildrenLayerDispatch,
  useChildrenLayerStore,
} from "../contexts/childrenLayerContext";
import { CompoundLayer } from "../model/layer";
import { LayerListItem } from "./LayerListItem";
import { SortableLayers } from "./SortableLayers";

type Props = {
  layer: CompoundLayer;
};

export const CompoundLayerProperty = ({ layer }: Props): JSX.Element => {
  const store = useChildrenLayerStore();
  const children = store.filter((l) => l.parent === layer.id);

  return (
    <div>
      <SortableLayers parent={layer.id} empty={children.length === 0}>
        {children.map((layer, index) => (
          <LayerListItem key={layer.id} layer={layer} index={index} />
        ))}
      </SortableLayers>
    </div>
  );
};
