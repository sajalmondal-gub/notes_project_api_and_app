import React from "react";
import { Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../types";
type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">
interface Props {
    navigation: LoginScreenNavigationProp;
}



export const LoginScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View>
            <Text>this is login screen</Text>
        </View>
    );
}