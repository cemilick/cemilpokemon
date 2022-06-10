import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainRoutes from './src/routes/MainRoutes';

export default function App() {
  return (
    <NavigationContainer>
      <MainRoutes />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
