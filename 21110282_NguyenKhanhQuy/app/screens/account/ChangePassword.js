import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, Image } from "react-native";

import { updatePassword } from "../../services/AuthAPIService";

import { getToken } from "../../utils/AuthStorage";

export default function ChangePasswordScreen({ route, navigation }) {
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const validatePassword = (value) => {
        if (value.trim() === "") {
            setPasswordError("Vui lòng nhập mật khẩu hiện tại");
        } else {
            setPasswordError("");
        }
        setPassword(value);
    };

    const validateNewPassword = (value) => {
        if (value.trim() === "") {
            setNewPasswordError("Vui lòng nhập mật khẩu mới");
        } else {
            setNewPasswordError("");
        }
        setNewPassword(value);
    };

    const validateConfirmPassword = (value) => {
        if (value.trim() === "") {
            setConfirmPasswordError("Vui lòng nhập lại mật khẩu mới");
        } else if (newPassword !== value) {
            setConfirmPasswordError("Nhập lại mật khẩu không trùng khớp");
        } else {
            setConfirmPasswordError("");
        }
        setConfirmPassword(value);
    };

    const handleResetPassword = async () => {
        let isValid = true;

        if (password.trim() === "") {
            setPasswordError("Vui lòng nhập mật khẩu hiện tại");
            isValid = false;
        }
        if (newPassword.trim() === "") {
            setNewPasswordError("Vui lòng nhập mật khẩu mới");
            isValid = false;
        }
        if (confirmPassword.trim() === "") {
            setConfirmPasswordError("Vui lòng nhập lại mật khẩu mới");
            isValid = false;
        } else if (newPassword !== confirmPassword) {
            setConfirmPasswordError("Nhập lại mật khẩu không trùng khớp");
            isValid = false;
        }

        if (isValid) {
            try {
                Alert.alert("Thành công", "Đổi mật khẩu thành công.");
            } catch (error) {
                Alert.alert("Lỗi", "Đã xảy ra lỗi. Hãy thử lại.");
            }
        }
    };

    const handleSave = async () => {
        try {
            const token = await getToken();
            if (token) {
                const data = await updatePassword(token, password, newPassword);
                if (data.success) {
                    Alert.alert("Thành công", "Đổi mật khẩu thành công");
                    navigation.goBack();
                } else {
                    Alert.alert("Lỗi", data.message);
                }
            }
        } catch (error) {
            Alert.alert("Lỗi", "Đã xảy ra lỗi. Hãy thử lại");
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View className="flex-1 bg-[#f1f4f9] justify-between">
            <View className="bg-white px-3 py-5 mx-4 my-4">
                <Text className="text-lg font-bold text-[#333] mb-2">Email đăng nhập</Text>
                <View className="flex-row items-center w-full h-10 rounded-md mb-2 px-4 bg-[#f1f1f1] border border-[#e2e0e0]">
                    <TextInput
                        className="flex-1 h-full text-base"
                        placeholder="Email"
                        value={route.params.user.email}
                        placeholderTextColor="#a0a0a0"
                        editable={false}
                    />
                </View>

                <Text className="text-lg font-bold text-[#333] mb-2">Mật khẩu hiện tại</Text>
                <View className="flex-row items-center w-full h-10 rounded-md mb-2 px-4 bg-white border border-[#e2e0e0]">
                    <TextInput
                        className="flex-1 h-full text-base"
                        placeholder="Mật khẩu hiện tại"
                        secureTextEntry={true}
                        placeholderTextColor="#a0a0a0"
                        value={password}
                        onChangeText={validatePassword}
                    />
                </View>
                {passwordError ? <Text className="text-red-500 mb-2 text-sm">{passwordError}</Text> : null}

                <Text className="text-lg font-bold text-[#333] mb-2">Mật khẩu mới</Text>
                <View className="flex-row items-center w-full h-10 rounded-md mb-2 px-4 bg-white border border-[#e2e0e0]">
                    <TextInput
                        className="flex-1 h-full text-base"
                        placeholder="Mật khẩu mới"
                        secureTextEntry={true}
                        placeholderTextColor="#a0a0a0"
                        value={newPassword}
                        onChangeText={validateNewPassword}
                    />
                </View>
                {newPasswordError ? <Text className="text-red-500 mb-2 text-sm">{newPasswordError}</Text> : null}

                <Text className="text-lg font-bold text-[#333] mb-2">Nhập lại mật khẩu mới</Text>
                <View className="flex-row items-center w-full h-10 rounded-md mb-2 px-4 bg-white border border-[#e2e0e0]">
                    <TextInput
                        className="flex-1 h-full text-base"
                        placeholder="Nhập lại mật khẩu mới"
                        secureTextEntry={true}
                        placeholderTextColor="#a0a0a0"
                        value={confirmPassword}
                        onChangeText={validateConfirmPassword}
                    />
                </View>
                {confirmPasswordError ? (
                    <Text className="text-red-500 mb-2 text-sm">{confirmPasswordError}</Text>
                ) : null}
            </View>

            <View className="flex-row justify-between bg-white py-3 px-2">
                <TouchableOpacity
                    className="border border-[#509b43] rounded-full py-3 px-4 w-[49%]"
                    onPress={handleCancel}
                >
                    <Text className="text-[#509b43] text-center font-bold text-base">Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#509b43] rounded-full py-3 px-4 w-[49%]" onPress={handleSave}>
                    <Text className="text-white text-center font-bold text-base">Lưu</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
