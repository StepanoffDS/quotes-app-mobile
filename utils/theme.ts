export type Theme = 'light' | 'dark';

export const lightColors = {
  background: '#fff',
  surface: '#f9f9f9',
  card: '#f0f0f0',
  text: '#333',
  textSecondary: '#666',
  textTertiary: '#999',
  textDisabled: '#bbb',
  border: '#ddd',
  borderLight: '#eee',
  primary: '#007AFF',
  error: '#FF3B30',
  placeholder: '#999',
};

export const darkColors = {
  background: '#111',
  surface: '#1c1c1e',
  card: '#2c2c2e',
  text: '#fff',
  textSecondary: '#ebebf5',
  textTertiary: '#8e8e93',
  textDisabled: '#636366',
  border: '#38383a',
  borderLight: '#2c2c2e',
  primary: '#0a84ff',
  error: '#ff453a',
  placeholder: '#8e8e93',
};

export const getColors = (theme: Theme) => {
  return theme === 'dark' ? darkColors : lightColors;
};
