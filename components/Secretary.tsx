import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the type for your navigation routes
export type RootStackParamList = {
  Secretary: undefined;
  Plan: undefined;
};

const transportOptions = [
  { label: "Driving", value: "Driving" },
  { label: "Public Transport", value: "Public" },
];

const Secretary: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [details, setDetails] = useState("");
  const [tot, setTot] = useState("Driving");
  const [budget, setBudget] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const windowWidth = Dimensions.get("window").width;
  // Calculate the width for each input (dropdown and budget)
  // Subtracting paddings and gap (36 for padding, 18 for gap)
  const inputWidth = (windowWidth - 2 * 32 - 18) / 2;

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
        <View style={[styles.dropdownWrapper, { width: inputWidth }]}>
          {/* Custom Dropdown */}
          <Pressable
            style={styles.picker}
            onPress={() => setDropdownOpen((open) => !open)}
          >
            <Text
              style={{
                color: "#2b5b43",
                fontFamily: "Comic Sans MS",
                fontSize: 22,
              }}
            >
              {transportOptions.find((o) => o.value === tot)?.label}
            </Text>
          </Pressable>
          {dropdownOpen && (
            <View style={styles.dropdownList}>
              {transportOptions.map((option, idx) => (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    setTot(option.value);
                    setDropdownOpen(false);
                  }}
                  onHoverIn={() => setHoveredIndex(idx)}
                  onHoverOut={() => setHoveredIndex(null)}
                  style={[
                    styles.dropdownItem,
                    hoveredIndex === idx && styles.dropdownItemHovered,
                  ]}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      hoveredIndex === idx && styles.dropdownItemTextHovered,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
        <TextInput
          style={[styles.budgetInput, { width: inputWidth }]}
          placeholder="Budget"
          placeholderTextColor="#2b5b43"
          value={budget}
          onChangeText={setBudget}
          keyboardType="numeric"
        />
      </View>
      <Pressable
        style={styles.planButton}
        onPress={() =>
          navigation.navigate("Plan", {
            details,
            tot,
            budget,
          })
        }
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
    padding: 32, // increased from 20
    overflow: "visible",
    zIndex: 100,
  },
  title: {
    fontFamily: "Comic Sans MS",
    fontSize: 28, // increased from 20
    color: "#2b5b43",
    marginVertical: 18, // increased from 12
  },
  image: {
    width: 260, // increased from 200
    height: 260, // increased from 200
    resizeMode: "contain",
    marginBottom: 28, // increased from 20
  },
  input: {
    backgroundColor: "#f9cd8d",
    borderRadius: 14, // increased from 10
    padding: 18, // increased from 12
    width: "100%",
    marginBottom: 18, // increased from 12
    fontFamily: "Comic Sans MS",
    fontSize: 22, // increased from 16
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 18, // increased from 10
    marginBottom: 28, // increased from 20
    overflow: "visible",
    zIndex: 200,
  },
  dropdownWrapper: {
    borderRadius: 12, // increased from 8
    borderWidth: 1.5, // increased from 1
    borderColor: "#b67234",
    backgroundColor: "#f9cd8d",
    flex: undefined, // override flex so width can be set dynamically
    position: "relative",
    zIndex: 3000,
    overflow: "visible",
    marginRight: 0, // remove any margin if present
  },
  picker: {
    height: 54, // increased from 40
    justifyContent: "center",
    paddingHorizontal: 18, // increased from 10
    color: "#2b5b43",
    backgroundColor: "#f9cd8d",
    borderRadius: 12, // increased from 8
    width: "100%", // take full width of wrapper
  },
  dropdownList: {
    position: "absolute",
    top: 54, // match new picker height
    left: 0,
    right: 0,
    backgroundColor: "#f9cd8d",
    borderRadius: 12, // increased from 8
    borderWidth: 1.5, // increased from 1
    borderColor: "#b67234",
    zIndex: 4000,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6, // increased from 4
    elevation: 24, // increased from 20
    overflow: "visible",
    width: "100%", // match width of picker
  },
  dropdownItem: {
    padding: 16, // increased from 10
    borderRadius: 12, // increased from 8
    fontFamily: "Comic Sans MS",
  },
  dropdownItemHovered: {
    backgroundColor: "#fff1a6",
  },
  dropdownItemText: {
    color: "#b67234",
    fontFamily: "Comic Sans MS",
    fontSize: 22, // match input and picker font size
  },
  dropdownItemTextHovered: {
    color: "#2b5b43",
    fontFamily: "Comic Sans MS",
    fontSize: 22, // match input and picker font size
  },
  budgetInput: {
    flex: undefined, // override flex so width can be set dynamically
    backgroundColor: "#f9cd8d",
    borderRadius: 12, // increased from 8
    borderWidth: 1.5, // increased from 1
    borderColor: "#b67234",
    paddingHorizontal: 18, // increased from 10
    fontFamily: "Comic Sans MS",
    color: "#2b5b43",
    fontSize: 22, // increased from default
    marginLeft: 0, // remove any margin if present
  },
  planButton: {
    backgroundColor: "#cde0af",
    paddingVertical: 18, // increased from 10
    paddingHorizontal: 48, // increased from 30
    borderRadius: 14, // increased from 10
    marginTop: 10, // add a bit more space
  },
  planText: {
    fontFamily: "Comic Sans MS",
    color: "#2b5b43",
    fontSize: 26, // increased from 18
  },
});

export default Secretary;
