import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from '../navigation/RootNavigator';
import { ThemeProvider, useTheme } from '../../theme';
import { StatusBar } from 'react-native';


const AppNavigationInner: React.FC = () => {
    const { isDark, colors } = useTheme();

    return (
        <>
            {/* Dynamic Native System Status Bar */}
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background.primary}
                translucent={false}
            />
            <NavigationContainer>
                <RootNavigator />
            </NavigationContainer>
        </>
    );
}

export const NavigationProvider: React.FC = () => {
    const { isDark, colors } = useTheme();
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <AppNavigationInner />
            </ThemeProvider>
        </SafeAreaProvider>
    );
};