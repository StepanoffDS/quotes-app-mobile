import { Tabs } from 'expo-router';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { AddIcon, HomeIcon, ListIcon, SettingsIcon } from '@/shared/ui/icons';

function TabsNavigator() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
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
    <ThemeProvider>
      <TabsNavigator />
    </ThemeProvider>
  );
}
