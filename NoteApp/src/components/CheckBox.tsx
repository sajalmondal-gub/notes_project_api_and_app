import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useTheme } from '../theme';

interface Propos {
    label: string;
    isChecked: boolean;
    onPress: () => void;
    error?: string;
}

const Checkbox: React.FC<Propos> = ({ label, isChecked, onPress, error }) => {
    const { colors, typography, radius } = useTheme();
    return (
        <View className="mb-2">
            <Pressable
                className="flex-row items-center p-4 active:opacity-70"
                onPress={onPress}
            >
                <View
                    className="w-6 h-6 justify-center items-center mr-3"
                    style={{
                        borderRadius: radius.md || 4,
                        borderWidth: 2,
                        borderColor: error
                            ? 'red'
                            : isChecked
                                ? colors.primary?.default
                                : colors.border.default,
                        backgroundColor: isChecked
                            ? colors.primary?.default : 'transparent',
                    }}
                >
                    {isChecked && (
                        <Text
                            style={{
                                color: colors.text.secondary,
                                fontSize: typography.fontSizes.sm,
                                fontWeight: typography.fontWeights.bold,
                            }}
                        >
                            ✓
                        </Text>
                    )}
                </View>

                {label && (
                    <Text
                        className="flex-1"
                        style={{
                            color: colors.text.secondary,
                            fontSize: typography.fontSizes.xs,
                        }}
                    >
                        {label}
                    </Text>
                )}
            </Pressable>

            {error && (
                <Text className="text-red-500 text-xs mt-1 ml-14">
                    {error}
                </Text>
            )}
        </View>
    );
};

export default Checkbox;
