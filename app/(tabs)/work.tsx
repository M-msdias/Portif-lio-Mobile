import React from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { TimelineItem } from '../../components/TimelineItem';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function WorkScreen() {
  const { colors } = useTheme();
  const { work, loading } = usePortfolioData();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Experiência" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.heading, { color: colors.textPrimary, fontFamily: 'Inter_700Bold' }]}>
          Experiência Profissional
        </Text>
        <Text style={[styles.sub, { color: colors.textMuted, fontFamily: 'Inter_400Regular' }]}>
          Cargos, escopo e tecnologias utilizadas.
        </Text>

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.timeline}>
            {work.map((item, index) => (
              <TimelineItem
                key={item.id}
                title={item.title}
                subtitle={item.company}
                period={`${item.startYear} — ${item.endYear}`}
                description={item.description}
                tags={item.tags}
                isLast={index === work.length - 1}
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
