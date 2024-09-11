import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Alert } from "react-native";

export default function PersonalInfo({ route, navigation }) {
    const [fullName, setFullName] = useState(route.params.user.fullName);
    const [fullNameError, setFullNameError] = useState("");

    const validateFullName = (value) => {
        if (value.trim() === "") {
            setFullNameError("Họ và tên không được để trống");
        } else {
            setFullNameError("");
        }
        setFullName(value);
    };

    const handleSave = () => {
        if (fullName.trim() === "") {
            setFullNameError("Họ và tên không được để trống");
        } else {
            setFullNameError("");

            try {
                // Xử lý logic lưu thông tin cá nhân
                Alert.alert("Thành công", "Cập nhật thông tin tài khoản thành công.");
            } catch (error) {
                Alert.alert("Lỗi", "Đã xảy ra lỗi. Hãy thử lại.");
            }
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View className="flex-1 bg-gray-100">
            {/* Form Section */}
            <View className="flex-1 mt-6 px-6">
                <Text className="text-base font-bold mb-2">Email</Text>
                <View className="bg-gray-200 rounded-lg px-4 py-3 mb-4">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Email"
                        placeholderTextColor="#a0a0a0"
                        value={route.params.user.email}
                        editable={false}
                    />
                </View>

                <Text className="text-base font-bold mb-2">Họ và tên</Text>
                <View className="bg-white rounded-lg px-4 py-3 mb-4">
                    <TextInput
                        className="text-base text-gray-700"
                        placeholder="Nhập họ và tên"
                        placeholderTextColor="#a0a0a0"
                        value={fullName}
                        onChangeText={validateFullName}
                    />
                </View>
                {fullNameError ? <Text className="text-red-500 text-sm mb-4">{fullNameError}</Text> : null}
            </View>

            {/* Button Section */}
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
