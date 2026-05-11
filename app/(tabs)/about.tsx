import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenHeader } from '../../components/ScreenHeader';
import { Card } from '../../components/Card';
import { Tag } from '../../components/Tag';
import { useTheme } from '../../context/ThemeContext';

const TECH_STACK = ['React Native', 'TypeScript', 'Expo Router', 'Back4App', 'Reanimated'];

const DESIGN_SYSTEM = [
  { label: 'Fundo', color: '#0A1A19', lightColor: '#FFFFFF' },
  { label: 'Superfície', color: '#142B29', lightColor: '#F4F7F7' },
  { label: 'Primária', color: '#E6748E', lightColor: '#E6748E' },
];

export default function AboutScreen() {
  const { colors, isDark } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Sobre este app" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <Text style={[styles.heading, { color: colors.textPrimary, fontFamily: 'Inter_700Bold' }]}>
          Sobre este app
        </Text>
        <Text style={[styles.subtext, { color: colors.textMuted, fontFamily: 'Inter_400Regular' }]}>
          Um portfólio mobile-first inspirado no estilo da Linear e Vercel — escuro por padrão, tipografia discreta
          e animações que respeitam o conteúdo. Construído com React Native e apresentado em todas as
          plataformas via Expo Go.
        </Text>

        {/* Extra feature card */}
        <Card accentBorder style={[styles.featureCard, { borderColor: colors.primaryBorder }]}>
          <View style={styles.featureLabel}>
            <Ionicons name="sparkles" size={14} color={colors.primary} />
            <Text style={[styles.featureLabelText, { color: colors.primary, fontFamily: 'Inter_600SemiBold' }]}>
              {' '}RECURSO ADICIONAL
            </Text>
          </View>
          <Text style={[styles.featureTitle, { color: colors.textPrimary, fontFamily: 'Inter_700Bold' }]}>
            Tema claro/escuro persistente
          </Text>
          <Text style={[styles.featureDesc, { color: colors.textMuted, fontFamily: 'Inter_400Regular' }]}>
            Toque no sol/lua no cabeçalho para alternar os temas. A escolha persiste entre as sessões via
            AsyncStorage e anima suavemente entre as paletas.
          </Text>
        </Card>

        {/* Tech stack */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="layers-outline" size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Inter_600SemiBold' }]}>
              {' '}Tecnologias
            </Text>
          </View>
          <View style={styles.tags}>
            {TECH_STACK.map((tag, i) => (
              <Tag key={tag} label={tag} index={i} />
            ))}
          </View>
        </View>

        {/* Design system */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="color-palette-outline" size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Inter_600SemiBold' }]}>
              {' '}Sistema de design
            </Text>
          </View>
          <View style={styles.swatches}>
            {DESIGN_SYSTEM.map((swatch) => (
              <View key={swatch.label} style={styles.swatch}>
                <View
                  style={[
                    styles.swatchColor,
                    {
                      backgroundColor: isDark ? swatch.color : swatch.lightColor,
                      borderColor: colors.border,
                    },
                  ]}
                />
                <Text style={[styles.swatchLabel, { color: colors.textMuted, fontFamily: 'Inter_400Regular' }]}>
                  {swatch.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Backend note */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="cloud-outline" size={18} color={colors.primary} />
            <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontFamily: 'Inter_600SemiBold' }]}>
              {' '}Servidor
            </Text>
          </View>
          <Text style={[styles.subtext, { color: colors.textMuted, fontFamily: 'Inter_400Regular' }]}>
            Os dados são buscados no Back4App (Parse SDK). Se o servidor estiver indisponível, o app retorna
            graciosamente para os dados locais para que sempre mantenha o visual.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  heading: { fontSize: 28, marginBottom: 10 },
  subtext: { fontSize: 14, lineHeight: 22, marginBottom: 20 },
  featureCard: { marginBottom: 24 },
  featureLabel: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  featureLabelText: { fontSize: 11, letterSpacing: 1 },
  featureTitle: { fontSize: 18, marginBottom: 8 },
  featureDesc: { fontSize: 13, lineHeight: 20 },
  section: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  sectionTitle: { fontSize: 16 },
  tags: { flexDirection: 'row', flexWrap: 'wrap' },
  swatches: { flexDirection: 'row', gap: 12 },
  swatch: { flex: 1, alignItems: 'center', gap: 8 },
  swatchColor: { width: '100%', height: 64, borderRadius: 12, borderWidth: 2 },
  swatchLabel: { fontSize: 12 },
});
