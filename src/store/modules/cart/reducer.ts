import produce from "immer";
import { Reducer } from "redux";
import { ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case "ADD_PRODUCT_TO_CART": {
        const { product } = action.payload;

        const findProductInCart = state.items.findIndex((item) => {
          return item.product.id === product.id;
        });

        if (findProductInCart >= 0) {
          draft.items[findProductInCart].quantity++;
          return;
        }
        draft.items.push({
          product,
          quantity: 1,
        });

        break;
      }
      default: {
        return state;
      }
    }
  });
};

export default cart;
