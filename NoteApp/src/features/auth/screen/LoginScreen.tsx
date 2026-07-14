import React from "react";
import { Image, Text, TextInput, View, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../types";
import { useTheme } from "../../../theme";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import Icon from '@react-native-vector-icons/ionicons';

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">

interface Props {
    navigation: LoginScreenNavigationProp;
}




export const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { colors, typography, radius } = useTheme();
    return (
        <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.background.primary }}>
            <Animated.View entering={FadeIn.duration(1500)} className="items-center justify-center shadow-md">
                <Image source={require('../../../assets/logo/note_logo.png')}
                    style={{ height: 150, width: 150 }}
                />
            </Animated.View>
            <Animated.View entering={FadeInDown.duration(1000).delay(600)} className="items-center justify-center px-5">
                <Text style={{ color: colors.text.primary, fontSize: typography.fontSizes["3xl"], fontWeight: typography.fontWeights.extrabold }}>Welcome Back!</Text>
                <Text className="text-center" style={{ color: colors.text.brand, fontSize: typography.fontSizes.lg }}>Your distraction-free space for deep creative work</Text>
            </Animated.View>
            <Animated.View entering={FadeInDown.duration(1000).delay(800)} className="w-full px-5 mt-10">
                <View className="mb-4">
                    <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm, marginBottom: 8, fontWeight: typography.fontWeights.medium }}>Email Address</Text>
                    <TextInput
                        placeholder="Enter your email"
                        placeholderTextColor={colors.text.disabled}
                        style={{
                            backgroundColor: colors.background.secondary,
                            color: colors.text.primary,
                            borderRadius: radius.xl,
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            fontSize: typography.fontSizes.lg,
                            borderWidth: 1,
                            borderColor: colors.border?.default || 'transparent'
                        }}
                    />
                </View>

                <View className="mb-6">
                    <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm, marginBottom: 8, fontWeight: typography.fontWeights.medium }}>Password</Text>
                    <TextInput
                        placeholder="Enter your password"
                        placeholderTextColor={colors.text.disabled}
                        secureTextEntry
                        style={{
                            backgroundColor: colors.background.secondary,
                            color: colors.text.primary,
                            borderRadius: radius.xl,
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            fontSize: typography.fontSizes.lg,
                            borderWidth: 1,
                            borderColor: colors.border?.default || 'transparent'
                        }}
                    />
                    <Text style={{ color: colors.text.brand, fontSize: typography.fontSizes.sm, marginTop: 8, textAlign: 'right', fontWeight: typography.fontWeights.semibold }}>Forgot Password?</Text>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: colors.text.brand,
                        paddingVertical: 16,
                        borderRadius: radius.xl,
                        alignItems: 'center',
                        marginTop: 8,
                        shadowColor: colors.text.brand,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 4,
                        elevation: 5,
                    }}
                >
                    <Text style={{ color: colors.text.primary, fontSize: typography.fontSizes.lg, fontWeight: typography.fontWeights.bold }}>Log In</Text>
                </TouchableOpacity>

                <View className="flex-row items-center mt-8 mb-6">
                    <View className="flex-1 h-[1px]" style={{ backgroundColor: colors.border?.default }} />
                    <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm, paddingHorizontal: 16 }}>Or continue with</Text>
                    <View className="flex-1 h-[1px]" style={{ backgroundColor: colors.border?.default }} />
                </View>

                <View className="flex-row justify-between mb-8">
                    <TouchableOpacity style={{ flex: 1, backgroundColor: colors.background.secondary, padding: 14, borderRadius: radius.xl, alignItems: 'center', borderWidth: 1, borderColor: colors.border?.default || '#E5E5E5', marginRight: 8 }}>
                        <Icon name="logo-google" size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: colors.background.secondary, padding: 14, borderRadius: radius.xl, alignItems: 'center', borderWidth: 1, borderColor: colors.border?.default || '#E5E5E5', marginHorizontal: 4 }}>
                        <Icon name="logo-facebook" size={24} color="#1877F2" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: colors.background.secondary, padding: 14, borderRadius: radius.xl, alignItems: 'center', borderWidth: 1, borderColor: colors.border?.default || '#E5E5E5', marginLeft: 8 }}>
                        <Icon name="logo-apple" size={24} color={colors.text.primary} />
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-center mt-2">
                    <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm }}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ color: colors.text.brand, fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.bold }}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View className="items-center mt-8 mb-4">
                    <Text className="text-center leading-6" style={{ color: colors.text.secondary, fontSize: typography.fontSizes.xs }}>
                        By logging in, you agree to our{" "}
                        <Text style={{ color: colors.text.brand, fontWeight: typography.fontWeights.semibold }}>Terms of Service</Text> and <Text style={{ color: colors.text.brand, fontWeight: typography.fontWeights.semibold }}>Privacy Policy</Text>
                    </Text>
                </View>
            </Animated.View>
        </View>
    );
}