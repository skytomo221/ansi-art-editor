import React from "react";
import { useLayersDispatch } from "../contexts/layersContext";
import { Button, ButtonGroup } from "@blueprintjs/core";
import { TextLayer } from "../model/textLayer";

export const AddLayer = (): JSX.Element => {
  const dispatch = useLayersDispatch();

  function addTextLayer() {
    dispatch({
      type: "ADD_LAYER",
      layer: new TextLayer("Text Layer", { x: 0, y: 0 }, ""),
    });
  }

  return (
    <ButtonGroup>
      <Button text="Text" icon="new-text-box" onClick={addTextLayer} />
      <Button text="Paint" icon="style" />
      <Button text="Image" icon="media" />
    </ButtonGroup>
  );
};
