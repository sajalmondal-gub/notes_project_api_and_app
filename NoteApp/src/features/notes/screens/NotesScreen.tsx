import React from "react";
import { Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../../types";
type NotesScreenNavigationProps = NativeStackNavigationProp<MainStackParamList, 'NotesScreen'>

interface Props {
    navigation: NotesScreenNavigationProps;
}

export const NotesScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View>
            <Text>This is home screen</Text>
        </View>
    );
}