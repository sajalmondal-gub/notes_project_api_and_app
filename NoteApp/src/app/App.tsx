import '../../global.css';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../theme/useTheme';

function App() {
  const theme = useTheme();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      {/* Using Tailwind utility classes that pull from global.css */}
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <View className="p-6 bg-surface rounded-2xl shadow-md border border-border">
          
          <Text className="text-3xl font-bold text-primary-600">NoteApp</Text>
          <Text className="text-text-muted mt-2 text-center mb-6">
            Enterprise Theme Active!
          </Text>

          {/* Using purely Tailwind utility classes (className) for the custom colors! */}
          <View className="bg-success p-3 rounded-lg">
            <Text className="text-text-inverse font-bold">
              Tailwind className Works!
            </Text>
          </View>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
