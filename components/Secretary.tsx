import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Secretary: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                How can I help you today?
            </Text>
            <View style={styles.box}>
                {/* Content for the box goes here */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
    },
    box: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Secretary;
