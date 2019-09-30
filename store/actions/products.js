import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    // async action creator
    try {
      const userId = getState().auth.userId;
      const res = await fetch(
        "https://rn-shopper.firebaseio.com/products.json"
      );

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      // returns ID created by Firebase
      const resData = await res.json();
      const productsArr = [];

      for (const key in resData) {
        productsArr.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      const userProducts = productsArr.filter(prod => prod.ownerId === userId);

      dispatch({
        type: SET_PRODUCTS,
        payload: productsArr,
        userProducts
      });
    } catch (err) {
      // send to custom analytics server maybe
      throw err;
    }
  };
};

export const deleteProduct = prodId => {
  return async dispatch => {
    try {
      const token = getState().auth.token;

      const res = await fetch(
        `https://rn-shopper.firebaseio.com/products/${prodId}.json?auth=${token}`,
        {
          method: "DELETE"
        }
      );

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      dispatch({
        type: DELETE_PRODUCT,
        payload: prodId
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    // async action creator
    try {
      const token = getState().auth.token;
      const userId = getState().auth.userId;

      const res = await fetch(
        `https://rn-shopper.firebaseio.com/products.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl,
            price,
            ownerId: userId
          })
        }
      );

      // returns ID created by Firebase
      const resData = await res.json();
      dispatch({
        type: CREATE_PRODUCT,
        payload: {
          id: resData.name,
          title,
          description,
          imageUrl,
          price,
          ownerId: userId
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      const res = await fetch(
        `https://rn-shopper.firebaseio.com/products/${id}.json?auth=${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            description,
            imageUrl
          })
        }
      );

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      dispatch({
        type: UPDATE_PRODUCT,
        pid: id,
        payload: {
          title,
          description,
          imageUrl
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};
