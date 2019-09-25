import PRODUCTS from "../../data/testData";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId == "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
