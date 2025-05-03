import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, Platform } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./Secretary";

const { width } = Dimensions.get("window");

const GOOGLE_MAPS_API_KEY = "AIzaSyDXlf0tCD7YL2sIRX0MlPLcvp9r4fu_peE"; // Replace with yours!

const Plan: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, "Plan">>();
  const { backendPlan, tot } = route.params;
  const { destination, travelInfo, plan } = backendPlan;

  const mode = tot === "Driving" ? "driving" : "transit";

  const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=current+location&destination=${encodeURIComponent(destination)}&mode=${mode}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../assets/pompompurin.png")}
        style={styles.image}
      />
      <Text style={styles.header}>Here's what I got for you!</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destination</Text>
        <Text style={styles.text}>{destination}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Travel Info</Text>
        <Text style={styles.text}>Duration: {travelInfo.duration}</Text>
        <Text style={styles.text}>Departure Time: {travelInfo.departureTime}</Text>
        <Text style={styles.subTitle}>Steps:</Text>
        {travelInfo.steps.map((step: any, index: number) => (
          <Text key={index} style={styles.bulletText}>
            • {step.instructions.replace(/<[^>]+>/g, "")} ({step.duration})
          </Text>
        ))}
      </View>

      <View style={styles.mapWrapper}>
        {Platform.OS === "web" ? (
          <iframe
            src={mapUrl}
            width="100%"
            height="300"
            style={{ borderRadius: 12 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        ) : (
          <Text style={styles.text}>Map preview available only on web!</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Packing List</Text>
        {plan.packingList.map((item: string, index: number) => (
          <Text key={index} style={styles.bulletText}>• {item}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule</Text>
        {plan.schedule.map((sched: any, index: number) => (
          <Text key={index} style={styles.bulletText}>
            • {sched.time}: {sched.task}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fdf1bb",
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "contain",
    marginBottom: 10,
  },
  header: {
    fontFamily: "Comic Sans MS",
    fontSize: 22,
    color: "#2b5b43",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    width: "100%",
    backgroundColor: "#f9cd8d",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Comic Sans MS",
    fontSize: 18,
    color: "#2b5b43",
    marginBottom: 8,
  },
  text: {
    fontFamily: "Comic Sans MS",
    fontSize: 16,
    color: "#5c4033",
    marginBottom: 4,
  },
  subTitle: {
    fontFamily: "Comic Sans MS",
    fontSize: 16,
    color: "#2b5b43",
    marginTop: 8,
    marginBottom: 4,
  },
  bulletText: {
    fontFamily: "Comic Sans MS",
    fontSize: 15,
    color: "#5c4033",
    marginLeft: 10,
    marginBottom: 2,
  },
  mapWrapper: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    borderRadius: 12,
    overflow: "hidden",
  },
});

export default Plan;
