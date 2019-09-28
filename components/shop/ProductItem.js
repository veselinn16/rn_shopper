import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet
} from "react-native";

import Card from "../UI/Card";

const ProductItem = ({ image, title, price, onSelect, children }) => {
  const Touchable =
    Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

  return (
    // <View style={styles.touchable}>
    <Card style={styles.product}>
      <Touchable onPress={onSelect} useForeground>
        <View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: image }} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>${price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{children}</View>
        </View>
      </Touchable>
    </Card>
    // </View>
  );
};

const styles = StyleSheet.create({
  product: {
    // overflow: "hidden"
    margin: 20,
    height: 300,
    borderRadius: 10
  },
  touchable: {
    margin: 20,
    height: 300,
    borderRadius: 10
    // overflow: "hidden"
  },
  imageContainer: {
    overflow: "hidden",
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  image: {
    width: "100%",
    height: "100%"
  },
  details: {
    alignItems: "center",
    height: "17%",
    padding: 10
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginVertical: 2
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#888"
  },
  actions: {
    height: "23%",
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default ProductItem;
