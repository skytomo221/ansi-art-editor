import React from "react";

import { FileInput, FormGroup, NumericInput } from "@blueprintjs/core";
import { useChildrenLayerDispatch } from "../contexts/childrenLayerContext";
import { ImageLayer } from "../model/layer";
import DeleteLayer from "./DeleteLayer";

type Props = {
  layer: ImageLayer;
};

const MAX_WIDTH = 64;
const MAX_HEIGHT = 64;
const RAW_MAX_WIDTH = 512;
const RAW_MAX_HEIGHT = 512;

function keepAspectRatio(
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number
) {
  const aspectRatio = width / height;
  const maxAspectRatio = maxWidth / maxHeight;
  if (width <= maxWidth && height <= maxHeight) {
    return {
      width,
      height,
    };
  } else if (aspectRatio > maxAspectRatio) {
    return {
      width: maxWidth,
      height: Math.round(maxWidth / aspectRatio),
    };
  } else {
    return {
      width: Math.round(maxHeight * aspectRatio),
      height: maxHeight,
    };
  }
}

function getImageData(image: HTMLImageElement) {
  const start = performance.now();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (context) {
    const limitedSize = keepAspectRatio(
      image.width,
      image.height,
      RAW_MAX_WIDTH,
      RAW_MAX_HEIGHT
    );
    canvas.width = limitedSize.width;
    canvas.height = limitedSize.height;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const imagedata = context.getImageData(0, 0, canvas.width, canvas.height);
    const end = performance.now();
    console.log(end - start);
    return imagedata;
  }
}

export const ImageLayerProperty = ({ layer }: Props): JSX.Element => {
  const [x, setX] = React.useState(layer.offset.x);
  const [y, setY] = React.useState(layer.offset.y);
  const [width, setWidth] = React.useState(layer.width);
  const [height, setHeight] = React.useState(layer.height);
  const { id } = layer;
  const dispatch = useChildrenLayerDispatch();

  function changePosition() {
    layer.offset = { x, y };
    dispatch({
      type: "UPDATE_LAYER",
      id,
      layer,
    });
  }

  function changeSize() {
    layer.width = width;
    layer.height = height;
    dispatch({
      type: "UPDATE_LAYER",
      id,
      layer,
    });
  }

  function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
          const imagedata = getImageData(image);
          layer.imagedata = imagedata;
          const limitedSize = keepAspectRatio(
            image.width,
            image.height,
            MAX_WIDTH,
            MAX_HEIGHT
          );
          layer.width = limitedSize.width;
          layer.height = limitedSize.height;
          dispatch({
            type: "UPDATE_LAYER",
            id,
            layer,
          });
        };
        image.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div>
      <FormGroup style={{ display: "flex" }} label="Position">
        <FormGroup label="X">
          <NumericInput
            value={x}
            onValueChange={(n) => {
              setX(n);
            }}
            onBlur={changePosition}
            fill={true}
          />
        </FormGroup>
        <FormGroup label="Y">
          <NumericInput
            value={y}
            onValueChange={(n) => {
              setY(n);
            }}
            onBlur={changePosition}
            fill={true}
          />
        </FormGroup>
      </FormGroup>
      <FormGroup style={{ display: "flex" }} label="Size">
        <FormGroup label="Width">
          <NumericInput
            value={width}
            onValueChange={(n) => {
              setWidth(n);
            }}
            onBlur={changeSize}
            fill={true}
          />
        </FormGroup>
        <FormGroup label="Height">
          <NumericInput
            value={height}
            onValueChange={(n) => {
              setHeight(n);
            }}
            onBlur={changeSize}
            fill={true}
          />
        </FormGroup>
      </FormGroup>
      <FormGroup label="Image">
        <FileInput
          text="Choose file..."
          onInputChange={onInputChange}
          fill={true}
        />
      </FormGroup>
      <DeleteLayer layerId={layer.id} />
    </div>
  );
};
