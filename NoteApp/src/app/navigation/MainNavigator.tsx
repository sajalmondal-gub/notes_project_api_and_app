import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainStackParamList } from "../../types";

// Notes Feature Screens Import
import { NotesScreen } from "../../features/notes/screens/NotesScreen";

const MainStack = createNativeStackNavigator<MainStackParamList>();
export const MainNavigator: React.FC = () => {

    return (
        <MainStack.Navigator
            initialRouteName="NotesScreen"
            screenOptions={{
                headerShown: true,
                headerShadowVisible: false,
                animation: 'slide_from_right',
            }}
        >
            <MainStack.Screen name="NotesScreen" component={NotesScreen} />
        </MainStack.Navigator>
    );
}