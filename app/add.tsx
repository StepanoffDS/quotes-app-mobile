import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { getQuotes, Quote, saveQuotes } from '../utils/storage';
import { useTheme } from '../contexts/ThemeContext';

export default function AddQuote() {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const router = useRouter();
  const { colors } = useTheme();

  const handleSave = async () => {
    if (!text) {
      Alert.alert('Ошибка', 'Текст цитаты не может быть пустым');
      return;
    }

    try {
      const quotes = await getQuotes();
      const newQuote: Quote = {
        id: Date.now().toString(),
        text,
        source,
      };
      quotes.push(newQuote);
      await saveQuotes(quotes);
      router.back();
    } catch (error) {
      console.error('Failed to save quote:', error);
      Alert.alert('Ошибка', 'Не удалось сохранить цитату');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const styles = createStyles(colors);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Текст цитаты *</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={6}
          placeholder='Введите текст цитаты...'
          placeholderTextColor={colors.placeholder}
          value={text}
          onChangeText={setText}
          textAlignVertical='top'
        />

        <Text style={styles.label}>Источник </Text>
        <TextInput
          style={styles.textInput}
          placeholder='Введите автора или источник...'
          placeholderTextColor={colors.placeholder}
          value={source}
          onChangeText={setSource}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={styles.cancelButtonText}>Отмена</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Сохранить</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (colors: ReturnType<typeof import('../utils/theme').getColors>) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text,
  },
  textInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: colors.surface,
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.card,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
