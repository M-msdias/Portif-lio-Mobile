import React, { useRef, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScreenHeader } from '../../components/ScreenHeader';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../hooks/usePortfolioData';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { profile } = usePortfolioData();
  const router = useRouter();

  // Fade-in animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  // Typewriter cursor blink
  const cursorAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(cursorAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(cursorAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const quickLinks = [
    { label: 'GitHub', icon: 'logo-github', url: profile.github },
    { label: 'LinkedIn', icon: 'logo-linkedin', url: profile.linkedin },
    { label: 'E-mail', icon: 'mail-outline', url: `mailto:${profile.email}` },
  ];


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title={profile.name.split(' ')[0] + ' ' + profile.name.split(' ')[1]} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Hello banner */}
          <Text style={[styles.hello, { color: colors.primary, fontFamily: 'Inter_600SemiBold' }]}>
            OLÁ, EU SOU
          </Text>
          <Text style={[styles.name, { color: colors.textPrimary, fontFamily: 'Inter_700Bold' }]}>
            {profile.name}
          </Text>

          {/* Typewriter title */}
          <View style={styles.titleRow}>
            <Text style={[styles.chevron, { color: colors.primary }]}>{'> '}</Text>
            <Text style={[styles.titleText, { color: colors.textPrimary, fontFamily: 'Inter_500Medium' }]}>
              {profile.title}
            </Text>
            <Animated.Text style={[styles.cursor, { color: colors.primary, opacity: cursorAnim }]}>
              |
            </Animated.Text>
          </View>

          {/* Location */}
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={colors.textMuted} />
            <Text style={[styles.location, { color: colors.textMuted, fontFamily: 'Inter_400Regular' }]}>
              {' '}{profile.location}
            </Text>
          </View>

          {/* Bio */}
          <Text style={[styles.bio, { color: colors.textSecondary, fontFamily: 'Inter_400Regular' }]}>
            {profile.bio}
          </Text>

          {/* CTA button */}
          <TouchableOpacity
            style={[styles.ctaButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/(tabs)/projects')}
            activeOpacity={0.85}
          >
            <Text style={[styles.ctaText, { fontFamily: 'Inter_600SemiBold' }]}>
              Ver meus projetos
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Quick links */}
          <View style={styles.quickLinks}>
            {quickLinks.map((link) => (
              <TouchableOpacity
                key={link.label}
                style={[styles.quickLink, { backgroundColor: colors.surface, borderColor: colors.border }]}
                onPress={() => Linking.openURL(link.url)}
                activeOpacity={0.7}
              >
                <Ionicons name={link.icon as any} size={20} color={colors.textMuted} />
                <Text style={[styles.quickLinkText, { color: colors.textMuted, fontFamily: 'Inter_400Regular' }]}>
                  {link.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>


        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  hello: { fontSize: 12, letterSpacing: 2, marginBottom: 6 },
  name: { fontSize: 32, lineHeight: 40, marginBottom: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  chevron: { fontSize: 16 },
  titleText: { fontSize: 16 },
  cursor: { fontSize: 18 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  location: { fontSize: 13 },
  bio: { fontSize: 14, lineHeight: 22, marginBottom: 28 },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  ctaText: { fontSize: 16, color: '#FFFFFF' },
  quickLinks: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  quickLink: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    borderWidth: 2,
    paddingVertical: 14,
    gap: 6,
  },
  quickLinkText: { fontSize: 12 },
});
