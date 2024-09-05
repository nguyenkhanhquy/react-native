import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Alert, TouchableOpacity } from "react-native";
import { register } from "../../services/AuthAPIService";
import CommonStyles from "../../assets/styles/CommonStyles";

const Register = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [fullName, setfullName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async () => {
        // Kiểm tra mật khẩu và mật khẩu nhập lại có khớp không
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            const data = await register(email, fullName, password);

            if (data.success) {
                Alert.alert("Success", data.message);
                navigation.navigate("Login");
            } else {
                Alert.alert("Register failed", data.message);
            }
        } catch (error) {
            Alert.alert("Register failed", "An error occurred. Please try again.");
        }
    };

    return (
        <View style={CommonStyles.container}>
            <Text style={CommonStyles.title}>Register Page</Text>

            <TextInput style={CommonStyles.input} placeholder="Email" value={email} onChangeText={setEmail} />

            <TextInput style={CommonStyles.input} placeholder="Full Name" value={fullName} onChangeText={setfullName} />

            <TextInput
                style={CommonStyles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={CommonStyles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={CommonStyles.button} onPress={handleRegister}>
                <Text style={CommonStyles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity style={CommonStyles.button} onPress={() => navigation.navigate("Login")}>
                <Text style={CommonStyles.buttonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Register;
