import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, Pressable, StyleSheet, Platform } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./Secretary";
import { getWeather } from "../backend/services/weatherService";

const GOOGLE_MAPS_API_KEY = "AIzaSyDXlf0tCD7YL2sIRX0MlPLcvp9r4fu_peE"; // Replace yours

const Plan: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, "Plan">>();
    const { backendPlan, tot } = route.params;
    const { destination, travelInfo, plan } = backendPlan;
    const [checkedItems, setCheckedItems] = useState<number[]>([]);
    const [weatherInfo, setWeatherInfo] = useState<any>(null);
    const [updatedPackingList, setUpdatedPackingList] = useState<string[]>(plan.packingList);

    const mode = tot === "Driving" ? "driving" : "transit";

    const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${GOOGLE_MAPS_API_KEY}&origin=current+location&destination=${encodeURIComponent(destination)}&mode=${mode}`;

    useEffect(() => {
        async function fetchWeather() {
            try {
                const weather = await getWeather(destination);
                setWeatherInfo(weather);

                let extraItems: string[] = [];
                if (weather.isRaining) extraItems.push("Umbrella");
                if (weather.isSnowing) extraItems.push("Winter Jacket");
                if (weather.isSunny) extraItems.push("Sunscreen");

                setUpdatedPackingList([...plan.packingList, ...extraItems]);
            } catch (error) {
                console.error("Failed to fetch weather:", error);
            }
        }
        fetchWeather();
    }, [destination]);

    const toggleItem = (index: number) => {
        if (checkedItems.includes(index)) {
            setCheckedItems(checkedItems.filter(i => i !== index));
        } else {
            setCheckedItems([...checkedItems, index]);
        }
    };

    const getWeatherEmoji = (condition: string) => {
        if (condition.toLowerCase().includes("rain")) return "🌧️";
        if (condition.toLowerCase().includes("snow")) return "❄️";
        if (condition.toLowerCase().includes("sun")) return "🌞";
        if (condition.toLowerCase().includes("cloud")) return "☁️";
        return "🌈";
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={require("../assets/pompompurin.png")} style={styles.image} />
            <Text style={styles.header}>Here's what I got for you!</Text>

            {weatherInfo && (
                <Text style={styles.inlineText}>
                    {getWeatherEmoji(weatherInfo.condition)} {weatherInfo.tempC}°C, {weatherInfo.condition}
                </Text>
            )}
            <Text style={styles.inlineText}>Destination: {destination}</Text>

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
                {updatedPackingList.map((item, index) => (
                    <Pressable key={index} onPress={() => toggleItem(index)}>
                        <Text
                            style={[
                                styles.bulletText,
                                checkedItems.includes(index) && { textDecorationLine: "line-through", color: "#888" },
                            ]}
                        >
                            • {item}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Schedule</Text>
                {plan.schedule.map((sched: any, index: number) => (
                    <Pressable
                        key={index}
                        onPress={() => {
                            const calendarUrl = `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(
                                sched.task
                            )}&dates=&details=Planned+via+MiniDawsHacks`;
                            window.open(calendarUrl, "_blank");
                        }}
                    >
                        <Text style={styles.bulletText}>
                            ➕ {sched.time}: {sched.task}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff8e1", // Softer background
        padding: 20,
        alignItems: "center",
    },
    image: {
        width: 160, // Slightly smaller image
        height: 160,
        resizeMode: "contain",
        marginBottom: 15,
    },
    header: {
        fontFamily: "Comic Sans MS",
        fontSize: 24, // Larger header font
        color: "#3b6e50",
        marginBottom: 15,
        textAlign: "center",
    },
    inlineText: {
        fontFamily: "Comic Sans MS",
        fontSize: 16,
        color: "#5c4033",
        marginBottom: 10,
        textAlign: "center",
    },
    section: {
        width: "100%",
        backgroundColor: "#ffe0b2", // Softer section background
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontFamily: "Comic Sans MS",
        fontSize: 20, // Larger section title
        color: "#3b6e50",
        marginBottom: 10,
    },
    text: {
        fontFamily: "Comic Sans MS",
        fontSize: 16,
        color: "#5c4033",
        marginBottom: 6,
    },
    subTitle: {
        fontFamily: "Comic Sans MS",
        fontSize: 16,
        color: "#3b6e50",
        marginTop: 10,
        marginBottom: 6,
    },
    bulletText: {
        fontFamily: "Comic Sans MS",
        fontSize: 15,
        color: "#5c4033",
        marginLeft: 12,
        marginBottom: 4,
    },
    mapWrapper: {
        width: "100%",
        height: 300,
        marginBottom: 20,
        borderRadius: 12,
        overflow: "hidden",
        backgroundColor: "#f5f5f5", // Neutral background for map
    },
});

export default Plan;