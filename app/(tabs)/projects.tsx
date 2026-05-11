import React from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Tag } from '../../components/Tag';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function ProjectsScreen() {
  const { colors } = useTheme();
  const { projects, loading } = usePortfolioData();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Projetos" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.heading, { color: colors.textPrimary, fontFamily: 'Inter_700Bold' }]}>
          Projetos
        </Text>
        <Text style={[styles.sub, { color: colors.textMuted, fontFamily: 'Inter_400Regular' }]}>
          Uma seleção de trabalhos entregues em produção.
        </Text>

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 40 }} />
        ) : (
          projects.map((project) => (
            <Card key={project.id} style={styles.card}>
              {/* Project name + star */}
              <View style={styles.nameRow}>
                <Text
                  style={[
                    styles.projectName,
                    { color: colors.textPrimary, fontFamily: 'Inter_700Bold' },
                  ]}
                >
                  {project.name}
                </Text>
                {project.featured && (
                  <Ionicons name="star" size={14} color={colors.primary} style={{ marginLeft: 6 }} />
                )}
              </View>

              {/* Description */}
              <Text
                style={[styles.description, { color: colors.textMuted, fontFamily: 'Inter_400Regular' }]}
              >
                {project.description}
              </Text>

              {/* Tags */}
              <View style={styles.tags}>
                {project.tags.map((tag, i) => (
                  <Tag key={tag} label={tag} index={i} />
                ))}
              </View>
            </Card>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 28, marginBottom: 6 },
  sub: { fontSize: 14, marginBottom: 24 },
  card: { marginBottom: 12 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  projectName: { fontSize: 15 },
  description: { fontSize: 13, lineHeight: 20, marginBottom: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap' },
});
