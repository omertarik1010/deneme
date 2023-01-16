export const SORT_BY_PRICE = "sortByPrice";

export const productsReducer = (state, { type, value }) => {
  
  switch (type) {
    case SORT_BY_PRICE:
      return { ...state, [SORT_BY_PRICE]: value };
    default:
      return state;
  }
};
