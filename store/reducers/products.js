import PRODUCTS from "../../data/testData";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS
} from "../actions/products";

import Product from "../../models/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId == "u1")
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        userProducts: action.payload.filter(prod => prod.ownerId === "u1"),
        availableProducts: action.payload
      };

    case CREATE_PRODUCT:
      const { title, imageUrl, description, price, id } = action.payload;
      const newProduct = new Product(
        id,
        "u1",
        title,
        imageUrl,
        description,
        price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct)
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        prod => prod.id === action.pid
      );

      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        state.userProducts[productIndex].price
      );

      const udpatedUserProducts = [...state.userProducts];
      udpatedUserProducts[productIndex] = updatedProduct;

      const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid
      );

      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: udpatedUserProducts
      };
      break;
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          product => product.id !== action.payload
        ),
        availableProducts: state.availableProducts.filter(
          product => product.id !== action.payload
        )
      };
    default:
      return state;
  }
};
