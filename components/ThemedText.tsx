import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface ThemedTextProps extends TextProps {
  variant?: 'primary' | 'secondary' | 'muted' | 'accent';
}

export function ThemedText({ style, variant = 'primary', ...props }: ThemedTextProps) {
  const { colors } = useTheme();
  const color =
    variant === 'accent'
      ? colors.primary
      : variant === 'secondary'
      ? colors.textSecondary
      : variant === 'muted'
      ? colors.textMuted
      : colors.textPrimary;

  return (
    <Text
      style={[{ color, fontFamily: 'Inter_400Regular' }, style]}
      {...props}
    />
  );
}
