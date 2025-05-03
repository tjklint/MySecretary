import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>By ATK</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#fde3b2",
    padding: 12,
    borderTopWidth: 2,
    borderTopColor: "#f4a259",
    alignItems: "center",
  },
  text: {
    fontFamily: "Comic Sans MS",
    fontSize: 16,
    color: "#ec5c27",
    fontWeight: "bold",
  },
});

export default Footer;
