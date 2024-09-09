import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

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
        <View style={styles.container}>
            <Text style={styles.title}>Tài khoản</Text>

            {userInfo && (
                <>
                    <Image source={profileImage} style={styles.image} />
                    <Text style={styles.info}>Xin chào, {userInfo.fullName}</Text>
                    <Text style={styles.info}>Email: {userInfo.email}!</Text>
                    {userInfo.active ? (
                        <Text style={styles.info}>Tài khoản đã xác thực</Text>
                    ) : (
                        <Text style={styles.info}>Tài khoản chưa xác thực</Text>
                    )}
                    <Text style={styles.info}>Thời gian đăng ký: {userInfo.registrationDate}</Text>
                </>
            )}

            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eafaf1",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#6dcf5b",
        marginBottom: 30,
        textAlign: "center",
    },
    info: {
        textAlign: "center",
        fontSize: 18,
        color: "#333",
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#6dcf5b",
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
        marginBottom: 20,
    },
});
