import React from "react";
import { FlatList, Button, Platform } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButton";

import Colors from "../../constants/Colors";

const UserProductsScreen = props => {
  const userProducts = useSelector(state => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ProductItem
          onPress={() => {}}
          title={item.title}
          price={item.price}
          image={item.imageUrl}
        >
          <Button color={Colors.primary} title="Edit" onPress={() => {}} />
          <Button color={Colors.primary} title="Delete" onPress={() => {}} />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: "Your Products",
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

export default UserProductsScreen;
