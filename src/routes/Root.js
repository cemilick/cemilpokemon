import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainRoutes from './MainRoutes';

export default function Root() {
  return (
    <NavigationContainer>
      <MainRoutes />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
