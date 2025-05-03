import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Plan: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Plan;