import { Ionicons } from '@expo/vector-icons';


export function SettingsIcon({ color, size }: { color: string; size: number }) {
  return (
    <Ionicons
      name='settings-outline'
      size={size}
      color={color}
    />
  );
}
