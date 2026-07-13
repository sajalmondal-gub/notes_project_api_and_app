import '../../global.css';
import React, { useState } from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '../theme';
import { SplashScreen } from '../features/splash/SplashScreen';

function AppContent() {
  const { isDark, colors } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background.primary }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <View className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background.primary }}>
          {/* Main App Navigation or Content goes here */}
        </View>
      )}
    </SafeAreaView>
  );
}

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
