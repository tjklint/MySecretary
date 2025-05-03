import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Secretary from "./components/Secretary";
import Plan from "./components/Plan";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Stack.Navigator
            initialRouteName="Secretary"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Secretary" component={Secretary} />
            <Stack.Screen name="Plan" component={Plan} />
          </Stack.Navigator>
        </View>
        <Footer />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flex: 1,
  },
});
