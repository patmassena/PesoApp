import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Insert } from './bancoWeigth/Insert';
import { Remove } from './bancoWeigth/Remove';
import { AllWeights } from './bancoWeigth/AllWeights';
import { Update } from './bancoWeigth/Update';

export default function App() {
  return (
    <ImageBackground
      style={styles.background}
      >
      <View style={styles.container}>
        <Insert />
        <Update />
        <Remove />
        <AllWeights />
      </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
