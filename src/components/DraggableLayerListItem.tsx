import React from "react";
import { Draggable } from "@hello-pangea/dnd";

type Props = {
  layerId: number;
  index: number;
  children: React.ReactNode;
};

export const DraggableLayerListItem = ({
  layerId,
  index,
  children,
}: Props): JSX.Element => {
  return (
    <Draggable key={layerId} draggableId={layerId.toString()} index={index}>
      {(provided, _) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};
