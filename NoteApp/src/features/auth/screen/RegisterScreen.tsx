import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../types";
import { useTheme } from "../../../theme";
import Animated, { FadeIn } from "react-native-reanimated";
type RegisterNavigationProps = NativeStackNavigationProp<AuthStackParamList, 'Register'>
interface Props {
    navigation: RegisterNavigationProps
}

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const { colors, typography, radius } = useTheme();
    const [full_name, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cofirm_password, setCofirmPassword] = useState<string>('');
    const [validationErrors, setValidationErrors] = useState<{ full_name?: string, email?: string, password?: string, confirm_password?: string }>({});
    return (

        <View className="flex-1 justify-center items-center px-5" style={{ backgroundColor: colors.background.primary }}>
            <Animated.Image entering={FadeIn.duration(500).delay(100)} source={require('../../../assets/logo/note_logo.png')} style={{ height: 150, width: 150 }} />
            <View className="items-center justify-center">
                <Text style={{ color: colors.text.primary, fontSize: typography.fontSizes["2xl"], fontWeight: typography.fontWeights.bold }}>Create your Account</Text>
                <Text className="text-center" style={{ color: colors.text.brand, fontSize: typography.fontSizes.lg, fontWeight: typography.fontWeights.normal }}>Join high-output professionals in a space design for clarity and deep work</Text>
            </View>
            <View className="w-full mt-10">
                <View className="mb-5">
                    <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium, paddingBottom: 5 }}>Full Name *</Text>
                    <TextInput
                        placeholder="e.g.Jone Doe"
                        placeholderTextColor={colors.text.disabled}
                        value={full_name}
                        autoCapitalize="none"
                        style={{
                            backgroundColor: colors.background.secondary,
                            color: colors.text.primary,
                            borderRadius: radius.lg,
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            borderWidth: 1,
                            borderColor: validationErrors.full_name ? 'red' : (colors.border.default || 'transparent')
                        }}

                    />
                    {validationErrors.full_name && <Text style={{ color: 'red', fontSize: typography.fontSizes.xs, marginTop: 4, marginLeft: 4 }}>{validationErrors.full_name}</Text>}
                </View>
                <View className="mb-5">
                    <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium, paddingBottom: 5 }}>Email *</Text>
                    <TextInput
                        placeholder="e.g:jhon@gmail.com"
                        placeholderTextColor={colors.text.secondary}
                        value={email}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={{
                            backgroundColor: colors.background.secondary,
                            color: colors.text.disabled,
                            borderRadius: radius.lg,
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            borderWidth: 1,
                            borderColor: validationErrors.email ? 'red' : (colors.border.default || 'transparent')
                        }}
                    />
                    {validationErrors.email && <Text style={{ color: 'red', fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium }}>{validationErrors.email} </Text>}
                </View>
                <View className="mb-5">
                    <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium, paddingBottom: 5 }}>Password *</Text>
                    <TextInput
                        placeholder="*******"
                        placeholderTextColor={colors.text.secondary}
                        value={password}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={{
                            backgroundColor: colors.background.secondary,
                            color: colors.text.disabled,
                            borderRadius: radius.lg,
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            borderWidth: 1,
                            borderColor: validationErrors.password ? 'red' : (colors.border.default || 'transparent')
                        }}
                    />
                    {validationErrors.password && <Text style={{ color: 'red', fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium }}>{validationErrors.password} </Text>}
                </View>
                <View className="mb-5">
                    <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium, paddingBottom: 5 }}>Confirm Password *</Text>
                    <TextInput
                        placeholder="*******"
                        placeholderTextColor={colors.text.secondary}
                        value={cofirm_password}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={{
                            backgroundColor: colors.background.secondary,
                            color: colors.text.disabled,
                            borderRadius: radius.lg,
                            paddingHorizontal: 16,
                            paddingVertical: 14,
                            borderWidth: 1,
                            borderColor: validationErrors.confirm_password ? 'red' : (colors.border.default || 'transparent')
                        }}
                    />
                    {validationErrors.confirm_password && <Text style={{ color: 'red', fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium }}>{validationErrors.confirm_password} </Text>}
                </View>
            </View>

        </View>
    );
}