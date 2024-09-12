import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from "react-native";
import { resetPassword } from "../../services/AuthAPIService";
import CommonStyles from "../../assets/styles/CommonStyles";

const ResetPassword = ({ navigation, route }) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Lấy tham số từ route
    const { email } = route.params;

    const handleResetPassword = async () => {
        // Kiểm tra mật khẩu và mật khẩu nhập lại có khớp không
        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            const data = await resetPassword(email, newPassword);

            if (data.success) {
                Alert.alert("Success", data.message);
                navigation.navigate("Login");
            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            Alert.alert("Error", "An error occurred. Please try again.");
        }
    };

    return (
        <View style={CommonStyles.container}>
            <Text style={CommonStyles.title}>Reset Password Page</Text>

            <TextInput
                style={CommonStyles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={CommonStyles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={CommonStyles.button} onPress={handleResetPassword}>
                <Text style={CommonStyles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ResetPassword;
