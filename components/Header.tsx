import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>My Secretary</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fde3b2",
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#f4a259",
    alignItems: "center",
  },
  title: {
    fontFamily: "Comic Sans MS",
    fontSize: 24,
    color: "#ec5c27",
  },
});

export default Header;
