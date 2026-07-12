import React from 'react';
import { StatusBar, Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '../theme';

function AppContent() {
  const { colors, spacing, radius, typography, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <View 
        style={[
          styles.card, 
          { 
            backgroundColor: colors.surface.default,
            borderColor: colors.border.default,
            borderRadius: radius['2xl'],
            padding: spacing[6],
            shadowColor: colors.text.primary,
          }
        ]}
      >
        <Text style={[styles.title, { color: colors.primary.default, fontSize: typography.fontSizes['3xl'] }]}>
          NoteApp
        </Text>
        
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          Enterprise Theme Active!
        </Text>

        <View style={[styles.badge, { backgroundColor: colors.success.subtle, borderRadius: radius.md, padding: spacing[3] }]}>
          <Text style={[styles.badgeText, { color: colors.success.default, fontWeight: typography.fontWeights.bold }]}>
            Custom Theme System Works!
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
  },
  badge: {
    // defined inline
  },
  badgeText: {
    // defined inline
  },
});

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
