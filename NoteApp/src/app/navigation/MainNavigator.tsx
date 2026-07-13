import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainStackParamList } from "../../types";

// Notes Feature Screens Import

const MainStack = createNativeStackNavigator<MainStackParamList>();
export const MainNavigator: React.FC = () => {

    return(
        <MainStack.Navigator initialRouteName="">

        </MainStack.Navigator>
    );
}