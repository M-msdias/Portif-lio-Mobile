import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ThemedViewProps extends ViewProps {
  variant?: 'background' | 'surface' | 'surfaceElevated';
}

export function ThemedView({ style, variant = 'background', ...props }: ThemedViewProps) {
  const { colors } = useTheme();
  const bg =
    variant === 'surface'
      ? colors.surface
      : variant === 'surfaceElevated'
      ? colors.surfaceElevated
      : colors.background;

  return <View style={[{ backgroundColor: bg }, style]} {...props} />;
}
