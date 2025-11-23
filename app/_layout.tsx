import { Tabs } from 'expo-router';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { AddIcon, HomeIcon, ListIcon, SettingsIcon } from '@/shared/ui/icons';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

function TabsNavigator() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Цитаты',
          tabBarLabel: 'Главная',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='add'
        options={{
          title: 'Добавить цитату',
          tabBarLabel: 'Добавить',
          tabBarIcon: ({ color, size }) => (
            <AddIcon
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='list'
        options={{
          title: 'Все цитаты',
          tabBarLabel: 'Список',
          tabBarIcon: ({ color, size }) => (
            <ListIcon
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Настройки',
          tabBarLabel: 'Настройки',
          tabBarIcon: ({ color, size }) => (
            <SettingsIcon
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='edit'
        options={{
          href: null,
          title: 'Редактировать цитату',
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <TabsNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
