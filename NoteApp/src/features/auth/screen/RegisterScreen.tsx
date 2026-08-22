import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../types";
import { useTheme } from "../../../theme";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import Checkbox from "../../../components/common/CheckBox";
import Icon from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../hooks/useAuth";
type RegisterNavigationProps = NativeStackNavigationProp<AuthStackParamList, 'Register'>
interface Props {
    navigation: RegisterNavigationProps
}

export const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const { colors, typography, radius, isDark } = useTheme();
    const { register, authLoading, authError } = useAuth();
    const [first_name, setFirstName] = useState<string>('');
    const [last_name, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm_password, setCofirmPassword] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<{ first_name?: string, last_name?: string, email?: string, password?: string, confirm_password?: string, checked?: string }>({});

    const hadnleSignUpWorkFlow = async () => {
        const errors: { first_name?: string, last_name?: string, email?: string, password?: string, confirm_password?: string, checked?: string } = {}
        if (!first_name) errors.first_name = 'First Name is required';
        if (!last_name) errors.last_name = 'Last Name is required';
        if (!email) {
            errors.email = 'Email is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) errors.email = 'Please enter a valid email address';
        }

        if (!password) errors.password = 'Password is required';

        if (!confirm_password) {
            errors.confirm_password = 'Confirm Password is required';
        } else if (password && password !== confirm_password) {
            errors.confirm_password = 'Passwords do not match';
        }
        if (!checked) {
            errors.checked = 'You must agree to the Terms of Service and Privacy Policy';
        }
        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) return;
        try {
            await register({ first_name, last_name, email, password, confirm_password });
        } catch (error: any) {
            console.log('Registeration failed : ', error.message);
        }

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.primary }} >
            <StatusBar
                backgroundColor={colors.background.primary}
                barStyle={isDark ? 'light-content' : 'dark-content'}
                animated={true}
            />
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="flex-1 justify-center items-center px-5">
                        <Animated.Image entering={FadeIn.duration(500).delay(100)} source={require('../../../assets/logo/note_logo.png')} style={{ height: 150, width: 150 }} />
                        <View className="items-center justify-center">
                            <Text style={{ color: colors.text.primary, fontSize: typography.fontSizes["2xl"], fontWeight: typography.fontWeights.bold }}>Create your Account</Text>
                            <Text className="text-center" style={{ color: colors.text.brand, fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.semibold }}>Join high-output professionals in a space design for clarity and deep work</Text>
                        </View>

                        <View className="w-full mt-10">
                            <View className="flex-row gap-x-4 w-full">
                                <View className="mb-5 flex-1">
                                    <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium, paddingBottom: 5 }}>Full Name *</Text>
                                    <TextInput
                                        placeholder="e.g.Jone"
                                        placeholderTextColor={colors.text.disabled}
                                        value={first_name}
                                        autoCapitalize="none"
                                        style={{
                                            width: '100%',
                                            backgroundColor: colors.background.secondary,
                                            color: colors.text.primary,
                                            borderRadius: radius.lg,
                                            paddingHorizontal: 16,
                                            paddingVertical: 14,
                                            borderWidth: 1,
                                            borderColor: validationErrors.first_name ? 'red' : (colors.border.default || 'transparent')
                                        }}
                                        onChangeText={(text) => {
                                            setFirstName(text);
                                            setValidationErrors((prev) => ({ ...prev, first_name: undefined }));
                                        }}

                                    />
                                    {validationErrors.first_name && <Text style={{ color: 'red', fontSize: typography.fontSizes.xs, marginTop: 4, marginLeft: 4 }}>{validationErrors.first_name}</Text>}
                                </View>
                                <View className="mb-5 flex-1">
                                    <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium, paddingBottom: 5 }}>Last Name *</Text>
                                    <TextInput
                                        placeholder="e.g.Doe"
                                        placeholderTextColor={colors.text.disabled}
                                        value={last_name}
                                        autoCapitalize="none"
                                        style={{
                                            width: '100%',
                                            backgroundColor: colors.background.secondary,
                                            color: colors.text.primary,
                                            borderRadius: radius.lg,
                                            paddingHorizontal: 16,
                                            paddingVertical: 14,
                                            borderWidth: 1,
                                            borderColor: validationErrors.last_name ? 'red' : (colors.border.default || 'transparent')
                                        }}
                                        onChangeText={(text) => {
                                            setLastName(text);
                                            setValidationErrors((prev) => ({ ...prev, last_name: undefined }));
                                        }}

                                    />
                                    {validationErrors.first_name && <Text style={{ color: 'red', fontSize: typography.fontSizes.xs, marginTop: 4, marginLeft: 4 }}>{validationErrors.last_name}</Text>}
                                </View>
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
                                    onChangeText={(text) => {
                                        setEmail(text);
                                        setValidationErrors(prev => ({ ...prev, email: undefined }));
                                    }}
                                />
                                {validationErrors.email && <Text style={{ color: 'red', fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium }}>{validationErrors.email} </Text>}
                            </View>
                            <View className="mb-5">
                                <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium, paddingBottom: 5 }}>Password *</Text>
                                <View style={{ position: 'relative', justifyContent: 'center' }}>
                                    <TextInput
                                        placeholder="*******"
                                        placeholderTextColor={colors.text.secondary}
                                        value={password}
                                        secureTextEntry={!showPassword}
                                        style={{
                                            backgroundColor: colors.background.secondary,
                                            color: colors.text.disabled,
                                            borderRadius: radius.lg,
                                            paddingHorizontal: 16,
                                            paddingRight: 45,
                                            paddingVertical: 14,
                                            borderWidth: 1,
                                            borderColor: validationErrors.password ? 'red' : (colors.border.default || 'transparent')
                                        }}
                                        onChangeText={(text) => {
                                            setPassword(text);
                                            setValidationErrors(prev => ({ ...prev, password: undefined }));
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={{ position: 'absolute', right: 14, height: '100%', justifyContent: 'center' }}
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <Icon name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color={colors.text.secondary} />
                                    </TouchableOpacity>
                                </View>
                                {validationErrors.password && <Text style={{ color: 'red', fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium }}>{validationErrors.password} </Text>}
                            </View>
                            <View className="mb-5">
                                <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium, paddingBottom: 5 }}>Confirm Password *</Text>
                                <View style={{ position: 'relative', justifyContent: 'center' }}>
                                    <TextInput
                                        placeholder="*******"
                                        placeholderTextColor={colors.text.secondary}
                                        value={confirm_password}
                                        secureTextEntry={!showConfirmPassword}
                                        onChangeText={(text) => {
                                            setCofirmPassword(text);
                                            setValidationErrors(prev => ({ ...prev, confirm_password: undefined }));
                                        }}

                                        style={{
                                            backgroundColor: colors.background.secondary,
                                            color: colors.text.disabled,
                                            borderRadius: radius.lg,
                                            paddingHorizontal: 16,
                                            paddingVertical: 14,
                                            paddingRight: 45,
                                            borderWidth: 1,
                                            borderColor: validationErrors.confirm_password ? 'red' : (colors.border.default || 'transparent')
                                        }}
                                    />
                                    <TouchableOpacity
                                        style={{ position: 'absolute', right: 14, height: '100%', justifyContent: 'center' }}
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <Icon name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color={colors.text.secondary} />
                                    </TouchableOpacity>

                                </View>
                                {validationErrors.confirm_password && <Text style={{ color: 'red', fontSize: typography.fontSizes.sm, fontWeight: typography.fontWeights.medium }}>{validationErrors.confirm_password} </Text>}
                            </View>
                            <View className="mb-5">
                                <Checkbox label="I agree to The Terms Of Service and Privacy Policy" isChecked={checked} onPress={() => {
                                    setChecked(!checked);
                                    setValidationErrors(prev => ({ ...prev, checked: undefined }));
                                }}
                                    error={validationErrors.checked}
                                />
                            </View>

                            <TouchableOpacity
                                onPress={hadnleSignUpWorkFlow}
                                disabled={loading || authLoading}

                                style={{
                                    backgroundColor: (loading || authLoading) ? colors.border.default : colors.text.brand,
                                    paddingVertical: 16,
                                    borderRadius: radius.lg,
                                    alignItems: "center",
                                    marginTop: 8,
                                    shadowColor: colors.text.brand,
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 4,
                                    elevation: 5,
                                }}>
                                <Text style={{ color: colors.text.primary, fontSize: typography.fontSizes.lg, fontWeight: typography.fontWeights.bold }}>Sign Up</Text>
                            </TouchableOpacity>

                            <View className="flex-row justify-center mt-5">
                                <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm }}>Already have an account?{" "} </Text>
                                <TouchableOpacity onPress={() => { navigation.navigate('Login') }}><Text style={{ color: colors.text.brand, fontWeight: typography.fontWeights.bold, fontSize: typography.fontSizes.sm }}>Back to Login</Text></TouchableOpacity>
                            </View>

                            <View className="flex-row items-center mb-6 mt-8">
                                <View className="flex-1 h-[1px]" style={{ backgroundColor: colors.border.default }} />
                                <Text style={{ color: colors.text.secondary, fontSize: typography.fontSizes.sm, paddingHorizontal: 16 }}>or Continue with</Text>
                                <View className="flex-1 h-[1px]" style={{ backgroundColor: colors.border.default }} />
                            </View>
                            <View className="flex-row items-center justify-between mb-8">
                                <TouchableOpacity style={{ flex: 1, backgroundColor: colors.background.secondary, padding: 14, borderRadius: radius.xl, alignItems: "center", borderWidth: 1, borderColor: colors.border.default, marginRight: 8 }}>
                                    <Icon name="logo-google" size={24} color={colors.text.primary} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: colors.background.secondary, padding: 14, borderRadius: radius.xl, alignItems: "center", borderWidth: 1, borderColor: colors.border.default, marginHorizontal: 4 }}>
                                    <Icon name="logo-facebook" size={24} color="#1877F2" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flex: 1, backgroundColor: colors.background.secondary, padding: 14, alignItems: "center", borderRadius: radius.xl, borderWidth: 1, borderColor: colors.border.default, marginLeft: 8 }} >
                                    <Icon name="logo-apple" size={24} color={colors.text.primary} />
                                </TouchableOpacity>
                            </View>

                            <View className="items-center mt-8 mb-4">
                                <Text className="text-center leading-6" style={{ color: colors.text.secondary, fontSize: typography.fontSizes.xs }}>
                                    By logging in, you agree to our{" "}
                                    <Text style={{ color: colors.text.brand, fontWeight: typography.fontWeights.semibold }}>Terms of Service</Text> and <Text style={{ color: colors.text.brand, fontWeight: typography.fontWeights.semibold }}>Privacy Policy</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}