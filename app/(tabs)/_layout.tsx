import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

const TABS = [
  { name: 'index', label: 'Início', icon: 'home-outline', iconActive: 'home' },
  { name: 'about', label: 'Sobre', icon: 'person-outline', iconActive: 'person' },
  { name: 'academic', label: 'Acadêmico', icon: 'school-outline', iconActive: 'school' },
  { name: 'work', label: 'Carreira', icon: 'briefcase-outline', iconActive: 'briefcase' },
  { name: 'projects', label: 'Projetos', icon: 'layers-outline', iconActive: 'layers' },
] as const;

function CustomTabBar({ state, descriptors, navigation }: any) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: colors.tabBarBg,
          borderTopColor: colors.tabBarBorder,
          paddingBottom: insets.bottom + 4,
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const isActive = state.index === index;
        const tabInfo = TABS.find((t) => t.name === route.name);
        if (!tabInfo) return null;
        
        const label = (tabInfo as any).labelOverride ?? tabInfo.label;
        const iconName = isActive ? tabInfo.iconActive : tabInfo.icon;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={[
              styles.tabItem,
              isActive && [styles.tabItemActive, { backgroundColor: colors.primaryMuted }],
            ]}
            accessibilityRole="button"
            accessibilityLabel={label}
          >
            <Ionicons
              name={iconName as any}
              size={22}
              color={isActive ? colors.primary : colors.textMuted}
            />
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isActive ? colors.primary : colors.textMuted,
                  fontFamily: isActive ? 'Inter_600SemiBold' : 'Inter_400Regular',
                },
              ]}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="about" />
      <Tabs.Screen name="academic" />
      <Tabs.Screen name="work" />
      <Tabs.Screen name="projects" />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    paddingTop: 8,
    borderTopWidth: 2,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 12,
    marginHorizontal: 4,
    gap: 2,
  },
  tabItemActive: {
    borderRadius: 14,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
  },
});
