export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = prodId => ({
  type: DELETE_PRODUCT,
  payload: prodId
});

export const createProduct = (title, description, imageUrl, price) => ({
  type: CREATE_PRODUCT,
  payload: {
    title,
    description,
    imageUrl,
    price
  }
});

export const updateProduct = (id, title, description, imageUrl) => ({
  type: UPDATE_PRODUCT,
  pid: id,
  payload: {
    title,
    description,
    imageUrl
  }
});
