import './global.css';
import { StatusBar, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView className="flex-1 bg-gray-100 items-center justify-center">
        <View className="p-6 bg-white rounded-2xl shadow-md">
          <Text className="text-3xl font-bold text-blue-600">NoteApp</Text>
          <Text className="text-gray-500 mt-2 text-center">Tailwind CSS is working!</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
