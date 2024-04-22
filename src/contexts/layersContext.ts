import { CompoundLayer } from "../model/compoundLayer";
import { Layer } from "../model/layer";

import makeStore from "./makeStore";

type State = {layer: Layer, isOpen: boolean}[];

type Action =
  | {
      type: "ADD_LAYER";
      layer: Layer;
    }
  | {
      type: "DELETE_LAYER";
      index: number;
    }
  | {
      type: "UPDATE_LAYER";
      index: number;
      layer: Layer;
    }
  | {
      type: "OPEN_LAYER";
      index: number;
    }
  | {
      type: "CLOSE_LAYER";
      index: number;
    }
  | {
      type: "SWAP_LAYER";
      from: number;
      to: number;
    };

const initialState: State = [{layer: new CompoundLayer({ x: 0, y: 0 }, []), isOpen: false}];

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_LAYER":
      return [...state.slice(0, -1), { layer: action.layer, isOpen: false }, state[state.length - 1]];
    case "DELETE_LAYER":
      return state.filter((_, index) => index !== action.index);
    case "UPDATE_LAYER":
      return state.map((state, index) =>
        index === action.index ? {  ...state, layer: action.layer } : state
      );
    case "OPEN_LAYER":
      return state.map((layer, index) =>
        index === action.index ? {layer: layer.layer, isOpen: true} : layer
      );
    case "CLOSE_LAYER":
      return state.map((layer, index) =>
        index === action.index ? {layer: layer.layer, isOpen: false} : layer
      );
    case "SWAP_LAYER":
      const layers = [...state];
      const [layer] = layers.splice(action.from, 1);
      layers.splice(action.to, 0, layer);
      return layers;
    default:
      return state;
  }
};

const [LayersProvider, useLayersStore, useLayersDispatch] = makeStore(
  reducer,
  initialState
);

export { LayersProvider, useLayersStore, useLayersDispatch };
