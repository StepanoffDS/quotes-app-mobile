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

export default function AddQuote() {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const router = useRouter();

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Текст цитаты *</Text>
        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={6}
          placeholder='Введите текст цитаты...'
          value={text}
          onChangeText={setText}
          textAlignVertical='top'
        />

        <Text style={styles.label}>Источник </Text>
        <TextInput
          style={styles.textInput}
          placeholder='Введите автора или источник...'
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
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
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});
