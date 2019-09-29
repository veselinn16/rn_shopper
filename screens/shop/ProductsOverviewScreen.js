import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  FlatList,
  Button,
  Platform,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cart";
import * as productsActions from "../../store/actions/products";

import { HeaderButtons, Item } from "react-navigation-header-buttons";

import ProductItem from "../../components/shop/ProductItem";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";

const ProductsOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);

  const selectItem = (id, title) => {
    navigation.navigate("ProductDetails", {
      productId: id,
      productTitle: title
    });
  };
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);

    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);

    // load products initially
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  useEffect(() => {
    // load products on subsequent renders
    const willFocusSubscription = navigation.addListener(
      "willFocus",
      loadProducts
    );

    return () => {
      // navigation.removeListener("willFocus", loadProducts);
      willFocusSubscription.remove();
    };
  }, [loadProducts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ marginBottom: 10 }}>{error}</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default ProductsOverviewScreen;
