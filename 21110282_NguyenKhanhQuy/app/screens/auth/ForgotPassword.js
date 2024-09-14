import React, { useState } from "react";
import { Alert, ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

import { sendOtp } from "../../services/AuthAPIService";

const ForgotPassword = ({ navigation }) => {
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [otpSent, setOtpSent] = useState(false);

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
            position: "top",
            visibilityTime: 3000,
            text1Style: { fontSize: 16, fontWeight: "bold" },
            text2Style: { fontSize: 12 },
        });
    };

    const handleResetPassword = async () => {
        setLoading(true);
        const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.trim() === "") {
            setEmailError("Email không được để trống");
            setLoading(false);
        } else if (!emailRegex.test(email.toLowerCase())) {
            setEmailError("Email không đúng định dạng");
            setLoading(false);
        } else {
            setEmailError("");

            try {
                const data = await sendOtp(email);

                if (data.success) {
                    showToast("success", "Success", data.message);
                    navigation.navigate("ResetPassword", { email: email });
                    setOtpSent(true);
                } else {
                    if (data.statusCode === 404) {
                        setEmailError("Email này chưa được sử dụng, bạn hãy đăng ký tài khoản để tham gia");
                    } else {
                        setEmailError(data.message);
                    }
                }
            } catch (error) {
                Alert.alert("error", "Error", "An error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.title}>Quên mật khẩu</Text>
                <Text style={styles.description}>
                    Vui lòng nhập email đăng ký của bạn. Chúng tôi sẽ gửi hướng dẫn đổi mật khẩu tới email này.
                </Text>
                <View style={[styles.inputContainer, emailError ? styles.inputError : null]}>
                    {/* <Image source={icmail} style={[styles.icon, styles.iconFaded]} /> */}
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập email"
                        placeholderTextColor="#a0a0a0"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            setEmailError("");
                        }}
                        editable={!otpSent}
                    />
                </View>
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                    <Text style={styles.buttonText}>Tạo lại mật khẩu</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        alignItems: "flex-start",
        paddingHorizontal: 20,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 24,
        color: "#333",
        marginTop: 40,
        marginBottom: 30,
        fontWeight: "bold",
    },
    description: {
        fontSize: 16,
        color: "#333",
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 50,
        borderRadius: 5,
        marginBottom: 8,
        paddingHorizontal: 15,
        backgroundColor: "#f9f9f9",
    },
    inputError: {
        borderColor: "red",
        borderWidth: 1,
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    iconFaded: {
        tintColor: "#a0a0a0",
    },
    input: {
        flex: 1,
        height: "100%",
        fontSize: 16,
    },
    errorText: {
        color: "red",
        marginBottom: 16,
        fontSize: 14,
    },
    button: {
        backgroundColor: "#509b43",
        width: "100%",
        borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 18,
    },
    bold: {
        fontWeight: "bold",
    },
    noteText: {
        color: "#a0a0a0",
        textAlign: "center",
    },
});

export default ForgotPassword;
