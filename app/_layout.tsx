import { Stack, useRouter } from 'expo-router';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function StackNavigator() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Цитаты',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/settings')}
              style={{ marginRight: 16 }}
            >
              <Ionicons
                name='settings-outline'
                size={24}
                color='#fff'
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name='add'
        options={{
          title: 'Добавить цитату',
        }}
      />
      <Stack.Screen
        name='list'
        options={{
          title: 'Все цитаты',
        }}
      />
      <Stack.Screen
        name='edit'
        options={{
          title: 'Редактировать цитату',
        }}
      />
      <Stack.Screen
        name='settings'
        options={{
          title: 'Настройки',
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StackNavigator />
    </ThemeProvider>
  );
}
