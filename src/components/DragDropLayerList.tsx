import React from "react";
import { useLayersDispatch, useLayersStore } from "../contexts/layersContext";
import {
  DragDropContext,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

type Props = {
  children: React.ReactNode;
};

const grid = 8;

const getListStyle = (isDraggingOver: boolean) => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

export const DragDropLayerList = ({ children }: Props): JSX.Element => {
  const dispatch = useLayersDispatch();

  function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    dispatch({
      type: "SWAP_LAYER",
      from: result.source.index,
      to: result.destination.index,
    });
  }

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {children}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
