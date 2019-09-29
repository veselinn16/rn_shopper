import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/Colors";

import * as cartActions from "../../store/actions/cart";
import * as ordersActions from "../../store/actions/orders";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";

const CartScreen = props => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useSelector(state => state.cart.totalAmount);

  const cartItems = useSelector(state => {
    let itemsArray = [];
    for (let key in state.cart.items) {
      itemsArray.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }

    return itemsArray.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(cartActions.removeFromCart(item.productId));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading && <ActivityIndicator size="small" color={Colors.primary} />}
        <Button
          color={Colors.secondary}
          title="Order Now"
          disabled={cartItems.length === 0}
          onPress={() =>
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))
          }
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.productId}
        renderItem={({ item }) => (
          <CartItem
            quantity={item.quantity}
            title={item.productTitle}
            amount={item.sum}
            deletable
            onRemove={sendOrderHandler}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18
  },
  amount: {
    color: Colors.secondary
  }
});

CartScreen.navigationOptions = {
  headerTitle: "Your Cart"
};

export default CartScreen;
