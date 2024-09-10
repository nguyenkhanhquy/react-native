import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { logout } from "../../../services/AuthAPIService";
import { myInfo } from "../../../services/UsersAPIService";

import { getToken, deleteToken } from "../../../utils/AuthStorage";

// Import hình ảnh từ thư mục cục bộ
import profileImage from "../../../assets/img/cat.jpg";

export default function AccountTab({ route, navigation }) {
    const [userInfo, setUserInfo] = useState(null);

    const fetchUserInfo = async () => {
        try {
            const token = await getToken();
            if (token) {
                const data = await myInfo(token);
                if (data.success) {
                    setUserInfo(data.result);
                } else {
                    Alert.alert("Error", data.message);
                }
            }
        } catch (error) {
            Alert.alert("Error", "Failed to fetch user information.");
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserInfo();
        }, [])
    );

    const handleLogout = async () => {
        try {
            const token = await getToken();
            if (token) {
                const data = await logout(token);

                if (data.success) {
                    navigation.navigate("Login");
                    Alert.alert("Success", data.message);
                    deleteToken();
                }
            }
        } catch (error) {
            Alert.alert("Logout failed", "An error occurred. Please try again.");
        }
    };

    return (
        <View className="flex-1 bg-gray-100">
            {/* Background Section */}
            <View className="bg-[#5fa75f] h-36 w-full absolute top-0 left-0 right-0 z-[-1]" />

            {/* Profile Section */}
            {userInfo && (
                <>
                    <View className="flex-row bg-white rounded-lg p-5 mx-5 mt-20" style={styles.shadowStyle}>
                        <View className="relative">
                            <Image
                                source={profileImage}
                                className="w-24 h-24 rounded-full border-2 border-[#6dcf5b] mr-5"
                            />
                            <TouchableOpacity
                                className="absolute right-0 bottom-0 bg-gray-600 rounded-full p-1 border-2 border-white"
                                // onPress={selectImage}
                            >
                                <Ionicons name="camera-outline" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1">
                            <Text className="text-lg font-bold text-gray-800 mb-1">{userInfo.fullName}</Text>
                            <Text className="text-sm text-gray-600" numberOfLines={1} ellipsizeMode="tail">
                                {userInfo.email}
                            </Text>
                            {userInfo.active ? (
                                <Text className="text-sm font-bold text-gray-600 mt-2 ml-3">Tài khoản đã xác thực</Text>
                            ) : (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("ActivateAccount", { email: userInfo.email });
                                    }}
                                >
                                    <Text className="text-sm font-bold text-gray-600 mt-2 ml-3">
                                        Tài khoản chưa xác thực
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </>
            )}

            {/* Options Section */}
            <View className="px-5 mt-10">
                <TouchableOpacity
                    className="bg-white p-3 rounded-lg mb-4"
                    style={styles.shadowStyle}
                    // onPress={() => navigation.navigate("PersonalInfo")}
                >
                    <Text className="text-lg font-medium text-gray-800">Thông tin cá nhân</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="bg-white p-3 rounded-lg mb-4"
                    style={styles.shadowStyle}
                    onPress={() => navigation.navigate("ChangePassword")}
                >
                    <Text className="text-lg font-medium text-gray-800">Đổi mật khẩu</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-white p-3 rounded-lg" style={styles.shadowStyle} onPress={handleLogout}>
                    <Text className="text-lg font-medium text-red-600">Đăng xuất</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
});
