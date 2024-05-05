import React from "react";
import { Droppable } from "@hello-pangea/dnd";

type Props = {
  compoundLayerId: number;
  children: React.ReactNode;
};

export const DroppableLayerList = ({
  compoundLayerId,
  children,
}: Props): JSX.Element => {
  return (
    <Droppable droppableId={compoundLayerId.toString()} isCombineEnabled>
      {(provided, _) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
