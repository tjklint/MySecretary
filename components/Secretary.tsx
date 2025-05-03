import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import * as Location from "expo-location";

// Define the type for your navigation routes
export type RootStackParamList = {
  Secretary: undefined;
  Plan: { backendPlan: any; tot: string; budget: string };
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
  const inputWidth = (windowWidth - 2 * 32 - 18) / 2;

  const handlePlanTrip = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }
      const gps = await Location.getCurrentPositionAsync({});
      const originCoords = {
        latitude: gps.coords.latitude,
        longitude: gps.coords.longitude,
      };

      const response = await axios.post("http://localhost:3001/api/plan", {
        userInput: details,
        origin: originCoords,
        tot,
      });

      navigation.navigate("Plan", {
        backendPlan: response.data,
        tot,
        budget,
      });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while planning.");
    }
  };

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
      <Pressable style={styles.planButton} onPress={handlePlanTrip}>
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
    padding: 32,
    overflow: "visible",
    zIndex: 100,
  },
  title: {
    fontFamily: "Comic Sans MS",
    fontSize: 28,
    color: "#2b5b43",
    marginVertical: 18,
  },
  image: {
    width: 260,
    height: 260,
    resizeMode: "contain",
    marginBottom: 28,
  },
  input: {
    backgroundColor: "#f9cd8d",
    borderRadius: 14,
    padding: 18,
    width: "100%",
    marginBottom: 18,
    fontFamily: "Comic Sans MS",
    fontSize: 22,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 18,
    marginBottom: 28,
    overflow: "visible",
    zIndex: 200,
  },
  dropdownWrapper: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#b67234",
    backgroundColor: "#f9cd8d",
    flex: undefined,
    position: "relative",
    zIndex: 3000,
    overflow: "visible",
    marginRight: 0,
  },
  picker: {
    height: 54,
    justifyContent: "center",
    paddingHorizontal: 18,
    color: "#2b5b43",
    backgroundColor: "#f9cd8d",
    borderRadius: 12,
    width: "100%",
  },
  dropdownList: {
    position: "absolute",
    top: 54,
    left: 0,
    right: 0,
    backgroundColor: "#f9cd8d",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#b67234",
    zIndex: 4000,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 24,
    overflow: "visible",
    width: "100%",
  },
  dropdownItem: {
    padding: 16,
    borderRadius: 12,
    fontFamily: "Comic Sans MS",
  },
  dropdownItemHovered: {
    backgroundColor: "#fff1a6",
  },
  dropdownItemText: {
    color: "#b67234",
    fontFamily: "Comic Sans MS",
    fontSize: 22,
  },
  dropdownItemTextHovered: {
    color: "#2b5b43",
    fontFamily: "Comic Sans MS",
    fontSize: 22,
  },
  budgetInput: {
    flex: undefined,
    backgroundColor: "#f9cd8d",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#b67234",
    paddingHorizontal: 18,
    fontFamily: "Comic Sans MS",
    color: "#2b5b43",
    fontSize: 22,
    marginLeft: 0,
  },
  planButton: {
    backgroundColor: "#cde0af",
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 14,
    marginTop: 10,
  },
  planText: {
    fontFamily: "Comic Sans MS",
    color: "#2b5b43",
    fontSize: 26,
  },
});

export default Secretary;
