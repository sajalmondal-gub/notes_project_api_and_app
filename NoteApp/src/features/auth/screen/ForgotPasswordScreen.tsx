import React from "react";
import { Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../types";

type ForgotPasswordNavigatonProps = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>
interface Props {
    navigation: ForgotPasswordNavigatonProps;
}


export const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View>
            <Text>This is forgot password</Text>
        </View>
    );
}