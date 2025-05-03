import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Plan from "./Plan";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the type for your navigation routes
export type RootStackParamList = {
  Secretary: undefined;
  Plan: undefined;
};

const Secretary: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [details, setDetails] = useState("");
  const [tot, setTot] = useState("Driving");
  const [budget, setBudget] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How can I help you?</Text>
      <Image
        source={require("../assets/pompompurin.png")}
        style={styles.image}
      />
      <TextInput
        style={styles.input}
        placeholder="What are you planning? (ex: Hackathon, where, when...)"
        placeholderTextColor="#2b5b43"
        value={details}
        onChangeText={setDetails}
      />
      <View style={styles.row}>
        <View style={styles.dropdownWrapper}>
          <Picker
            selectedValue={tot}
            style={styles.picker}
            onValueChange={(itemValue) => setTot(itemValue)}
          >
            <Picker.Item label="Driving" value="Driving" color="#2b5b43" />
            <Picker.Item
              label="Public Transport"
              value="Public"
              color="#2b5b43"
            />
          </Picker>
        </View>
        <TextInput
          style={styles.budgetInput}
          placeholder="Budget"
          placeholderTextColor="#2b5b43"
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
        />
      </View>
      <Pressable
        style={styles.planButton}
        onPress={() => navigation.navigate("Plan")}
      >
        <Text style={styles.planText}>PLAN</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf1bb",
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontFamily: "Comic Sans MS",
    fontSize: 20,
    color: "#2b5b43",
    marginVertical: 12,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#f9cd8d",
    borderRadius: 10,
    padding: 12,
    width: "100%",
    marginBottom: 12,
    fontFamily: "Comic Sans MS",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
    marginBottom: 20,
  },
  dropdownWrapper: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#b67234",
    backgroundColor: "#f9cd8d",
    flex: 1,
  },
  picker: {
    height: 40,
    color: "#2b5b43",
    backgroundColor: "#f9cd8d",
  },
  budgetInput: {
    flex: 1,
    backgroundColor: "#f9cd8d",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#b67234",
    paddingHorizontal: 10,
    fontFamily: "Comic Sans MS",
    color: "#2b5b43",
  },
  planButton: {
    backgroundColor: "#cde0af",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  planText: {
    fontFamily: "Comic Sans MS",
    color: "#2b5b43",
    fontSize: 18,
  },
});

export default Secretary;
