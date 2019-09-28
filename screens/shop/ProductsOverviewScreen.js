import React, { useEffect } from "react";
import { FlatList, Button, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector(state => state.products.availableProducts);

  const selectItem = (id, title) => {
    navigation.navigate("ProductDetails", {
      productId: id,
      productTitle: title
    });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsActions.fetchProducts());
  }, [dispatch]);

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => selectItem(item.id, item.title)}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => selectItem(item.id, item.title)}
          />
          <Button
            color={Colors.primary}
            title="Add to Cart"
            onPress={() => dispatch(cartActions.addToCart(item))}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "All Products",
  headerRight: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Cart"
        iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
        onPress={() => navigation.navigate("Cart")}
      />
    </HeaderButtons>
  ),
  headerLeft: (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
        onPress={() => navigation.toggleDrawer()}
      />
    </HeaderButtons>
  )
});

export default ProductsOverviewScreen;
