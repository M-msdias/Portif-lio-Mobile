import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const TAG_COLORS = [
  'tagBlue',
  'tagPurple',
  'tagTeal',
  'tagGreen',
  'tagOrange',
] as const;

interface TagProps {
  label: string;
  index?: number;
}

export function Tag({ label, index = 0 }: TagProps) {
  const { colors } = useTheme();
  const colorKey = TAG_COLORS[index % TAG_COLORS.length];
  const tagColor = colors[colorKey];

  return (
    <View
      style={[
        styles.tag,
        { backgroundColor: tagColor.bg, borderColor: tagColor.border },
      ]}
    >
      <Text style={[styles.label, { color: tagColor.text, fontFamily: 'Inter_500Medium' }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
  },
});
