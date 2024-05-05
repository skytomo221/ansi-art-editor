import React from "react";
import { ReactSortable } from "react-sortablejs";
import {
  useChildrenLayerDispatch,
  useChildrenLayerStore,
} from "../contexts/childrenLayerContext";
import { Layer } from "../model/layer";

type Props = {
  parent: number;
  children: React.ReactNode;
  empty?: boolean;
};

export const SortableLayers = ({ parent, children, empty = false }: Props): JSX.Element => {
  const store = useChildrenLayerStore();
  const dispatch = useChildrenLayerDispatch();
  const childrenLayers = store.filter((l) => l.parent === parent);
  const setChildrenLayers = (newChildren: Layer[]) => {
    dispatch({ type: "UPDATE_CHILDREN", parent, layers: newChildren });
  };

  return (
    <ReactSortable
      list={childrenLayers}
      setList={setChildrenLayers}
      multiDrag
      group="layer"
      animation={150}
      fallbackOnBody
      swapThreshold={0.65}
      filter={"not-layer"}
      style={{ paddingBottom: empty ? "50px" : "unset" }}
    >
      {children}
    </ReactSortable>
  );
};
