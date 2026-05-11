import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Tag } from './Tag';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tags?: string[];
  isLast?: boolean;
}

export function TimelineItem({
  title,
  subtitle,
  period,
  description,
  tags,
  isLast = false,
}: TimelineItemProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Left column: dot + line */}
      <View style={styles.leftCol}>
        <View style={[styles.dot, { backgroundColor: colors.primary, shadowColor: colors.primary }]} />
        {!isLast && <View style={[styles.line, { backgroundColor: colors.border }]} />}
      </View>

      {/* Card */}
      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.cardHeader}>
          <Text
            style={[styles.title, { color: colors.textPrimary, fontFamily: 'Inter_600SemiBold' }]}
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text style={[styles.period, { color: colors.textMuted, fontFamily: 'Inter_400Regular' }]}>
            {period}
          </Text>
        </View>
        <Text style={[styles.subtitle, { color: colors.primary, fontFamily: 'Inter_500Medium' }]}>
          {subtitle}
        </Text>
        <Text style={[styles.description, { color: colors.textMuted, fontFamily: 'Inter_400Regular' }]}>
          {description}
        </Text>
        {tags && tags.length > 0 && (
          <View style={styles.tags}>
            {tags.map((tag, i) => (
              <Tag key={tag} label={tag} index={i} />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  leftCol: {
    alignItems: 'center',
    width: 24,
    marginRight: 12,
    paddingTop: 18,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 4,
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 6,
    marginBottom: -4,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
    gap: 8,
  },
  title: {
    fontSize: 15,
    flex: 1,
  },
  period: {
    fontSize: 12,
    flexShrink: 0,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 8,
  },
  description: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
