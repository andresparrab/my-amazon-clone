export const initialState = {
  basket: [],
  user: null,
};

// Selector ES6 WAY, is very higly use in production enviroment!!!!!!
export const getBasketTotal = (basket: []): number =>
  basket?.reduce((amount: number, item: any): number => {
    return item.price + amount;
  }, 0);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_TO_BASKET": {
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    }

    case "REMOVE_FROM_BASKET": {
      const index = state.basket.findIndex((basketItem: any) => {
        return basketItem.id === action.id;
      });
      const newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
        console.warn("Item INDEX IS:", index);
      } else {
        console.warn(`Cant remove product (id: ${action.id}) as is not in the basket!`);
      }
      return { ...state, basket: newBasket };
    }

    case "SET_USER": {
      return {
        ...state,
        user: action.user,
      };
    }

    case "EMPTY_BASKET": {
      return { ...state, basket: [] };
    }

    case "DEFAULT": {
      return {
        ...state,
        basket: [...state.basket],
      };
    }
    // default:
    //   return state;
  }

  switch (action.type) {
    default:
      return state;
  }
};
export default reducer;
