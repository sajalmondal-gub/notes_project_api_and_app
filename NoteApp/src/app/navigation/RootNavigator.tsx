import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Core State and Types Definition
import { RootStackParamList } from '../../types';
import { checkFirstTime, markFirstTimeCompleted } from '../../services/storage/asyncStorage';

import { useAuth } from '../../hooks/useAuth';

// Screen & Internal Navigators
import { SplashScreen } from '../../features/splash/SplashScreen';
import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator'



const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {

    const [isInitializing, setIsInitializing] = useState<boolean>(true);
    const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean>(true);
    const { isAuthenticated, authLoading } = useAuth();

    useEffect(() => {
        const runSystemCheck = async () => {
            try {
                const isFirstLaunch = await checkFirstTime();
                setIsFirstTimeUser(isFirstLaunch);
            } catch (fatalError) {
                // Production system recovery logger tracing fallback
                console.error('System initialization error pipeline: ', fatalError);
            } finally {
                setIsInitializing(false);
            }
        };
        runSystemCheck();
    }, []);
    // System Loading state controller layout barrier protection shield
    if (isInitializing || authLoading) {
        return (
            <View style={StyleSheet.absoluteFill} className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#0052CC" />
            </View>
        );
    }
    const handleBootstrapComplete = async () => {
        try {
            await markFirstTimeCompleted();
            setIsFirstTimeUser(false);
        } catch (err) {
            console.warn('Storage sync failed: ', err);
        }
    };

    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
                animation: 'fade', // Smooth fading layout translation structure rules validation
                contentStyle: { backgroundColor: '#FFFFFF' }
            }}
        >
            {isFirstTimeUser ? (
                // Stack Entry Point 1: Bootstrapping & Discovery Pipeline Module
                <RootStack.Screen name="Splash">
                    {(screenProps) => (
                        <SplashScreen {...screenProps} onFinish={handleBootstrapComplete} />
                    )}
                </RootStack.Screen>
            ) : !isAuthenticated ? (
                // Stack Entry Point 2: Vault Gate (Authentication Protected Path Stack Route Groups)
                <RootStack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    options={{
                        animationTypeForReplace: 'pop' // Logout or transition mechanics security protocol
                    }}
                />
            ) : (
                // Stack Entry Point 3: Operational Control Dashboard Area Layer (Authorized Token Module)
                <RootStack.Screen
                    name="Main"
                    component={MainNavigator}
                />
            )}
        </RootStack.Navigator>
    );
};