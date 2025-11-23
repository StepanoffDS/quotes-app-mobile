import { Ionicons } from '@expo/vector-icons';

export function ListIcon({ color, size }: { color: string; size: number }) {
  return (
    <Ionicons
      name='list-outline'
      size={size}
      color={color}
    />
  );
}
