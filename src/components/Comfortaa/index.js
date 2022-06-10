import {Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../res/colors';

export default function Index({
  decoration = 'none',
  children,
  type = 'Regular',
  size = 14,
  style,
}) {
  const styles = StyleSheet.create({
    text: {
      color: colors.primaryLight,
      fontFamily: `Comfortaa-${type}`,
      fontSize: size,
      textDecorationLine: decoration,
    },
  });

  return (
    <Text testID="text component" style={[styles.text, style]}>
      {children}
    </Text>
  );
}
