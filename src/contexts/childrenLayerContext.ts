import { CompoundLayer, ImageLayer, Layer, TextLayer } from "../model/layer";
import makeStore from "./makeContext";
import { renderTextLayer } from "../model/textLayer";
import { renderImageLayer } from "../model/imageLayer";
import { renderCompoundLayer } from "../model/compoundLayer";
import { DraggableLocation } from "@hello-pangea/dnd";
import { Combine } from "react-beautiful-dnd";

type State = Layer[];

type Action =
  | {
      type: "ADD_TEXT_LAYER";
      layer: Omit<TextLayer, "id" | "result" | "order">;
    }
  | {
      type: "ADD_IMAGE_LAYER";
      layer: Omit<ImageLayer, "id" | "result" | "order">;
    }
  | {
      type: "ADD_COMPOUND_LAYER";
      layer: Omit<CompoundLayer, "id" | "result" | "order">;
    }
  | {
      type: "REMOVE_LAYER";
      id: number;
    }
  | {
      type: "OPEN_LAYER";
      id: number;
    }
  | {
      type: "CLOSE_LAYER";
      id: number;
    }
  | {
      type: "RENAME_LAYER";
      id: number;
      name: string;
    }
  | {
      type: "UPDATE_LAYER";
      id: number;
      layer: Layer;
    }
  | {
      type: "MOVE_LAYER";
      source: DraggableLocation;
      destination: DraggableLocation;
      draggableId: string;
      combine: Combine;
    };

const initialState: State = [];

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TEXT_LAYER":
      return [
        ...state,
        {
          ...action.layer,
          id: state.reduce((max, layer) => Math.max(max, layer.id), 0) + 1,
          order: state.filter((layer) => layer.parent === 0).length,
          result: renderTextLayer(action.layer.offset, action.layer.text),
        },
      ];
    case "ADD_IMAGE_LAYER":
      return [
        ...state,
        {
          ...action.layer,
          id: state.reduce((max, layer) => Math.max(max, layer.id), 0) + 1,
          order: state.filter((layer) => layer.parent === 0).length,
          result: renderImageLayer(
            action.layer.offset,
            action.layer.imagedata,
            action.layer.width,
            action.layer.height
          ),
        },
      ];
    case "ADD_COMPOUND_LAYER":
      return [
        ...state,
        {
          ...action.layer,
          id: state.reduce((max, layer) => Math.max(max, layer.id), 0) + 1,
          order: state.filter((layer) => layer.parent === 0).length,
          result: [],
        },
      ];
    case "REMOVE_LAYER":
      return state.filter((layer) => layer.id !== action.id);
    case "OPEN_LAYER":
      return state.map((layer) =>
        layer.id === action.id ? { ...layer, isOpen: true } : layer
      );
    case "CLOSE_LAYER":
      return state.map((layer) =>
        layer.id === action.id ? { ...layer, isOpen: false } : layer
      );
    case "RENAME_LAYER":
      return state.map((layer) =>
        layer.id === action.id ? { ...layer, name: action.name } : layer
      );
    case "UPDATE_LAYER": {
      const { layer } = action;
      if (layer.type === "text") {
        layer.result = renderTextLayer(layer.offset, layer.text);
      } else if (layer.type === "image") {
        layer.result = renderImageLayer(
          layer.offset,
          layer.imagedata,
          layer.width,
          layer.height
        );
      } else if (layer.type === "compound") {
        layer.result = renderCompoundLayer(
          layer.offset,
          state.filter((layer) => layer.parent === layer.id)
        );
        return [...state, layer];
      }
      return state.map((layer) =>
        layer.id === action.id ? action.layer : layer
      );
    }
    case "MOVE_LAYER": {
      const { source, destination, draggableId, combine } = action;
      const layer = state.find((layer) => layer.id.toString() === draggableId);
      if (!layer) {
        return state;
      }
      if (combine) {
        if (
          state.find((layer) => layer.id.toString() === combine.draggableId)
            .type !== "compound"
        ) {
          return state;
        }
        const sourceCompoundLayerList = state
          .filter((layer) => layer.parent.toString() === source.droppableId)
          .sort((a, b) => a.order - b.order)
          .toSpliced(source.index, 1)
          .map((layer, index): Layer => ({ ...layer, order: index }));
        const destinationCompoundLayerList = state
          .filter((layer) => layer.parent.toString() === combine.draggableId)
          .sort((a, b) => a.order - b.order)
          .toSpliced(-1, 0, { ...layer, parent: Number(combine.draggableId) })
          .map((layer, index): Layer => ({ ...layer, order: index }));
        const reminder = state.filter(
          (layer) =>
            layer.parent.toString() !== source.droppableId &&
            layer.parent.toString() !== combine.draggableId
        );
        return [
          ...sourceCompoundLayerList,
          ...destinationCompoundLayerList,
          ...reminder,
        ];
      } else if (source.droppableId === destination.droppableId) {
        const compoundLayerList = state
          .filter((layer) => layer.parent.toString() === source.droppableId)
          .sort((a, b) => a.order - b.order)
          .toSpliced(source.index, 1)
          .toSpliced(destination.index, 0, layer)
          .map((layer, index): Layer => ({ ...layer, order: index }));
        const reminder = state.filter(
          (layer) => layer.parent.toString() !== source.droppableId
        );
        return [...compoundLayerList, ...reminder];
      } else {
        console.log(action)
        const sourceCompoundLayerList = state
          .filter((layer) => layer.parent.toString() === source.droppableId)
          .sort((a, b) => a.order - b.order)
          .toSpliced(source.index, 1)
          .map((layer, index): Layer => ({ ...layer, order: index }));
        const destinationCompoundLayerList = state
          .filter(
            (layer) => layer.parent.toString() === destination.droppableId
          )
          .sort((a, b) => a.order - b.order)
          .toSpliced(destination.index, 0, {
            ...layer,
            parent: Number(destination.droppableId),
          })
          .map((layer, index): Layer => ({ ...layer, order: index }));
        const reminder = sourceCompoundLayerList.filter(
          (layer) =>
            layer.parent.toString() !== source.droppableId &&
            layer.parent.toString() !== destination.droppableId
        );
        return [
          ...sourceCompoundLayerList,
          ...destinationCompoundLayerList,
          ...reminder,
        ];
      }
    }
  }
};

export const [
  ChildrenLayerProvider,
  useChildrenLayerStore,
  useChildrenLayerDispatch,
] = makeStore(reducer, initialState);
