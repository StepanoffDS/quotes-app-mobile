import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';
import { Theme } from '../utils/theme';

const themeOptions: { label: string; value: Theme }[] = [
  { label: 'Светлая', value: 'light' },
  { label: 'Темная', value: 'dark' },
  { label: 'Системная', value: 'system' },
];

export default function Settings() {
  const { theme, colors, saveTheme } = useTheme();

  const styles = createStyles(colors);

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Внешний вид</Text>

            <View style={styles.themeContainer}>
              <Text style={styles.label}>Тема</Text>
              <View style={styles.themeOptions}>
                {themeOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.themeOption,
                      theme === option.value && styles.themeOptionActive,
                    ]}
                    onPress={() => saveTheme(option.value)}
                  >
                    <Text
                      style={[
                        styles.themeOptionText,
                        theme === option.value && styles.themeOptionTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {theme === option.value && (
                      <View style={styles.checkmark}>
                        <Text style={styles.checkmarkText}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (
  colors: ReturnType<typeof import('../utils/theme').getColors>,
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    content: {
      padding: 20,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
      marginBottom: 16,
    },
    themeContainer: {
      marginTop: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
      marginBottom: 12,
    },
    themeOptions: {
      gap: 12,
    },
    themeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.surface,
      padding: 16,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: colors.border,
    },
    themeOptionActive: {
      borderColor: colors.primary,
      backgroundColor: colors.card,
    },
    themeOptionText: {
      fontSize: 16,
      fontWeight: '500',
      color: colors.text,
    },
    themeOptionTextActive: {
      color: colors.primary,
      fontWeight: '600',
    },
    checkmark: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkmarkText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
