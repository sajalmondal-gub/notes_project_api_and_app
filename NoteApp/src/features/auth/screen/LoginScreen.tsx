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
        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-xl text-black">this is login screen</Text>
        </View>
    );
}