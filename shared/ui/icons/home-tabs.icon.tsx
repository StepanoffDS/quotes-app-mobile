import { Ionicons } from '@expo/vector-icons';

export function HomeIcon({ color, size }: { color: string; size: number }) {
  return (
    <Ionicons
      name='home-outline'
      size={size}
      color={color}
    />
  );
}
