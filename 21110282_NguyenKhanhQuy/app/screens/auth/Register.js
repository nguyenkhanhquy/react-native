import React, { useState } from "react";
import { ActivityIndicator, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";

import { StatusBar } from "expo-status-bar";

import { register } from "../../services/AuthAPIService";

export default function Register({ navigation }) {
    const [loading, setLoading] = useState(false);

    const [fullName, setfullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        // Kiểm tra mật khẩu và mật khẩu nhập lại có khớp không
        if (password !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu nhập lại không khớp");
            return;
        }

        try {
            setLoading(true);
            const data = await register(email, fullName, password);

            if (data.success) {
                Alert.alert("Success", data.message);
                navigation.navigate("Login");
            } else {
                Alert.alert("Register failed", data.message);
            }
        } catch (error) {
            Alert.alert("Register failed", "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-white">
            <StatusBar style="auto" />

            {loading && (
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.1)", // Làm mờ phần nền xung quanh một chút
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 10,
                    }}
                >
                    {/* Hình vuông chứa ActivityIndicator */}
                    <View
                        style={{
                            width: 68, // Kích thước của hình vuông
                            height: 68,
                            backgroundColor: "#fff", // Màu nền trắng cho hình vuông
                            borderRadius: 10, // Bo góc cho hình vuông
                            justifyContent: "center",
                            alignItems: "center",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            elevation: 5, // Hiệu ứng đổ bóng cho Android
                        }}
                    >
                        <ActivityIndicator size="large" color="#16a34a" />
                    </View>
                </View>
            )}

            <Text className="text-center mt-3 text-3xl font-light text-[#509b43] font-bold">Đăng ký tài khoản</Text>
            <Text className="text-center mt-1 text-base text-[#000000]">Chào mừng bạn đến với Job Portal</Text>
            <View className="mt-5 mx-5 w-[280px]">
                <View>
                    <Text className="text-[#000000]">HỌ VÀ TÊN:</Text>
                    <TextInput
                        placeholder="Nhập họ và tên..."
                        className="border border-dotted p-2 text-[#000000] border-[#509b43] mt-1"
                        value={fullName}
                        onChangeText={setfullName}
                    />
                </View>

                <View className="mt-3">
                    <Text className="text-[#000000]">EMAIL:</Text>
                    <TextInput
                        placeholder="Nhập email..."
                        className="border border-dotted p-2 text-[#000000] border-[#509b43] mt-1"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View className="mt-3">
                    <Text className="text-[#000000]">MẬT KHẨU:</Text>
                    <TextInput
                        secureTextEntry
                        placeholder="Nhập mật khẩu..."
                        className="border text-[#000000] border-dotted p-2 border-[#509b43] mt-1"
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View className="mt-3">
                    <Text className="text-[#000000]">NHẬP LẠI MẬT KHẨU:</Text>
                    <TextInput
                        secureTextEntry
                        placeholder="Nhập lại mật khẩu..."
                        className="border text-[#000000] border-dotted p-2 border-[#509b43] mt-1"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                </View>

                <TouchableOpacity className="bg-[#509b43] p-3 mt-4" onPress={handleRegister}>
                    <Text className="text-center text-base text-white">Đăng ký</Text>
                </TouchableOpacity>

                <View className="mt-6 flex-row justify-center">
                    <Text className="text-[#000000]">Bạn đã có tài khoản? </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setEmail("");
                            setPassword("");
                            navigation.navigate("Login");
                        }}
                    >
                        <Text className="text-[#509b43] font-bold">Đăng nhập ngay</Text>
                    </TouchableOpacity>
                </View>

                <View className="mt-6 flex-row justify-center items-center">
                    <View style={{ flex: 1, height: 1, backgroundColor: "#509b43" }} />
                </View>

                <View className="mt-6 flex-row justify-center">
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("MainTabNavigator");
                        }}
                    >
                        <Text className="text-[#509b43] font-bold">Trải nghiệm không cần đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
