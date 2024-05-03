import React from "react";
import { useChildrenLayerDispatch } from "../contexts/childrenLayerContext";
import { Button, ButtonGroup } from "@blueprintjs/core";

export const AddLayer = (): JSX.Element => {
  const dispatch = useChildrenLayerDispatch();

  function addTextLayer() {
    dispatch({
      type: "ADD_TEXT_LAYER",
      layer: {
        type: "text",
        isOpen: false,
        name: "Text Layer",
        offset: { x: 0, y: 0 },
        text: "",
      },
    });
  }

  function addImageLayer() {
    dispatch({
      type: "ADD_IMAGE_LAYER",
      layer: {
        type: "image",
        isOpen: false,
        name: "Image Layer",
        offset: { x: 0, y: 0 },
        width: 0,
        height: 0,
        imagedata: undefined
      },
    });
  }

  return (
    <ButtonGroup>
      <Button text="Text" icon="new-text-box" onClick={addTextLayer} />
      <Button text="Paint" icon="style" />
      <Button text="Image" icon="media" onClick={addImageLayer} />
    </ButtonGroup>
  );
};
