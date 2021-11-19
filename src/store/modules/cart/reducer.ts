import produce from "immer";
import { Reducer } from "redux";
import { ActionTypes, ICartState } from "./types";

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
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

      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);

        break;
      }

      default: {
        return state;
      }
    }
  });
};

export default cart;
