import { Ionicons } from '@expo/vector-icons';

export function AddIcon({ color, size }: { color: string; size: number }) {
  return (
    <Ionicons
      name='add-outline'
      size={size}
      color={color}
    />
  );
}
