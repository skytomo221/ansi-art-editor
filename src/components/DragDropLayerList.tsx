import React from "react";
import { useChildrenLayerDispatch } from "../contexts/childrenLayerContext";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";

type Props = {
  children: React.ReactNode;
};

export const DragDropLayerList = ({ children }: Props): JSX.Element => {
  const dispatch = useChildrenLayerDispatch();

  function onDragEnd(result: DropResult) {
    if (!result.destination && !result.combine) {
      return;
    }
    dispatch({
      type: "MOVE_LAYER",
      source: result.source,
      destination: result.destination,
      draggableId: result.draggableId,
      combine: result.combine,
    });
  }

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};
