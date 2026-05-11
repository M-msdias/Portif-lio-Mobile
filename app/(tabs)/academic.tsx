import React from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TimelineItem } from '../../components/TimelineItem';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function AcademicScreen() {
  const { colors } = useTheme();
  const { academic, loading } = usePortfolioData();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Acadêmico" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.heading, { color: colors.textPrimary, fontFamily: 'Inter_700Bold' }]}>
          Formação Acadêmica
        </Text>
        <Text style={[styles.sub, { color: colors.textMuted, fontFamily: 'Inter_400Regular' }]}>
          Onde as bases foram construídas.
        </Text>

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.timeline}>
            {academic.map((item, index) => (
              <TimelineItem
                key={item.id}
                title={item.institution}
                subtitle={`${item.degree} · ${item.type}`}
                period={`${item.startYear} — ${item.endYear}`}
                description={item.description}
                isLast={index === academic.length - 1}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 28, marginBottom: 6 },
  sub: { fontSize: 14, marginBottom: 28 },
  timeline: {},
});
