import React from "react";
import { markFirstTimeCompleted } from "../../services/storage/asyncStorage";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import { useTheme } from "../../theme";

interface SplashScreenProps {
    onFinish: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
    const { colors } = useTheme();

    const handleGetStarted = async () => {
        await markFirstTimeCompleted();
        onFinish();
    }

    return (
        <View
            className="flex-1 items-center justify-center px-6"
            style={{ backgroundColor: colors.background.primary }}
        >
            <Animated.View
                entering={FadeIn.duration(1000)}
                className="w-32 h-32 rounded-[32px] items-center justify-center mb-8 shadow-sm"
                style={{ backgroundColor: colors.primary.subtle }}
            >
                <Text
                    className="text-6xl font-bold"
                    style={{ color: colors.primary.default }}
                >
                    N
                </Text>
            </Animated.View>
            <Animated.View
                entering={FadeInDown.duration(1000).delay(300)}
                className="items-center w-full"
            >
                <Text
                    className="text-4xl font-extrabold mb-3 tracking-tight text-center"
                    style={{ color: colors.text.primary }}
                >
                    NoteApp
                </Text>
                <Text
                    className="text-base text-center px-4 leading-relaxed"
                    style={{ color: colors.text.secondary }}
                >
                    Capture your thoughts, organize your workspace, and boost your productivity seamlessly.
                </Text>
            </Animated.View>

            {/* Call to Action Button */}
            <Animated.View
                entering={FadeInDown.duration(1000).delay(600)}
                className="absolute bottom-12 w-full px-6"
            >
                <TouchableOpacity
                    onPress={handleGetStarted}
                    activeOpacity={0.8}
                    className="w-full py-4 rounded-2xl items-center justify-center shadow-lg"
                    style={{ backgroundColor: colors.primary.default }}
                >
                    <Text
                        className="text-lg font-semibold tracking-wide"
                        style={{ color: colors.primary.foreground }}
                    >
                        Get Started
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
}