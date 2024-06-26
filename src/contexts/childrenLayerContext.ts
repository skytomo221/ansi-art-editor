import { CompoundLayer, ImageLayer, Layer, TextLayer } from "../model/layer";
import makeStore from "./makeContext";
import { renderTextLayer } from "../model/textLayer";
import { renderImageLayer } from "../model/imageLayer";
import { renderCompoundLayer } from "../model/compoundLayer";

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
      type: "DELETE_LAYER";
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
      type: "UPDATE_CHILDREN";
      parent: number;
      layers: Layer[];
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
          result: renderTextLayer(action.layer.offset, action.layer.text),
        },
      ];
    case "ADD_IMAGE_LAYER":
      return [
        ...state,
        {
          ...action.layer,
          id: state.reduce((max, layer) => Math.max(max, layer.id), 0) + 1,
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
          result: [],
        },
      ];
    case "DELETE_LAYER":
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
    case "UPDATE_CHILDREN":
      return state
        .filter(
          (layer) =>
            layer.parent !== action.parent &&
            action.layers.every((l) => l.id !== layer.id)
        )
        .toSpliced(
          -1,
          0,
          ...action.layers.map(
            (layer): Layer => ({ ...layer, parent: action.parent })
          )
        );
  }
};

export const [
  ChildrenLayerProvider,
  useChildrenLayerStore,
  useChildrenLayerDispatch,
] = makeStore(reducer, initialState);
