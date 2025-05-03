import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer';
import Secretary from './components/Secretary';
import Plan from './components/Plan';
import Prompting from './backend/services/geminiService';
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Secretary' | 'Plan'>('Secretary');

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {currentScreen === 'Secretary' ? (
          <Secretary />
        ) : (
          <Plan />
        )}
        <Button
          title={currentScreen === 'Secretary' ? 'Go to Plan' : 'Go to Secretary'}
          onPress={() =>
            setCurrentScreen(currentScreen === 'Secretary' ? 'Plan' : 'Secretary')
          }
        />
      </View>

      <Prompting />

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
