import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import CartItem from "./CartItem";
import Colors from "../../constants/Colors";

const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        color={Colors.primary}
        onPress={() => {
          setShowDetails(prevState => setShowDetails(!prevState));
        }}
        title={showDetails ? "Hide Details" : "Show Details"}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {items.map(cartItem => {
            return (
              <CartItem
                key={cartItem.productId}
                title={cartItem.productTitle}
                amount={cartItem.sum}
                quantity={cartItem.quantity}
              />
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    margin: 20,
    padding: 10,
    alignItems: "center"
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16
  },
  detailItems: {
    width: "100%"
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888"
  }
});

export default OrderItem;
