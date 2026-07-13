import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types";

// Feature screens import
import { LoginScreen } from '../../features/auth/screen/LoginScreen';
import { RegisterScreen } from '../../features/auth/screen/RegisterScreen';
import { ForgotPasswordScreen } from '../../features/auth/screen/ForgotPasswordScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
export const AuthNavigator: React.FC = () => {
    return (
        <AuthStack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',

            }}
        >
            <AuthStack.Screen name="Login" component={LoginScreen} />
            <AuthStack.Screen name="Register" component={RegisterScreen} />
            <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        </AuthStack.Navigator>
    );
}


