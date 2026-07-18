import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../theme";

interface Propos {
    label: string,
    isChecked: boolean,
    onPress: () => void,
    error?: string,
}

const Checkbox: React.FC<Propos> = ({ label, isChecked, onPress, error }) => {
    const { colors, typography, radius } = useTheme();
    return (
        <Pressable className="flex-row items-center justify-center my-10" onPress={onPress} >
            <View className="w-24 h-24 text-center items-center -jusitfy-center" style={{
                borderRadius: radius.lg,
                borderWidth: 2,
                borderColor:error?'red' :(colors.border.default||'transparent')


            }}>
                {isChecked && (
                    <View></View>
                )}
                {label && (
                    <Text></Text>
                )}
            </View>

        </Pressable>
    );
}
export default Checkbox;