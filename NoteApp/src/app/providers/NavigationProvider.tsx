import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from '../navigation/RootNavigator';

export const NavigationProvider: React.FC = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {/* Dynamic native context controller bridge loop */}
                <RootNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
};