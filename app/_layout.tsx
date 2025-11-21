import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Цитаты',
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: 'Добавить цитату',
        }}
      />
      <Stack.Screen
        name="list"
        options={{
          title: 'Все цитаты',
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: 'Редактировать цитату',
        }}
      />
    </Stack>
  );
}
