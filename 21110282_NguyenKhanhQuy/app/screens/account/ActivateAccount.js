import React, { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { sendOtp, activate } from "../../services/AuthAPIService";
import CommonStyles from "../../assets/styles/CommonStyles";
import Toast from "react-native-toast-message";

import { getToken } from "../../utils/AuthStorage";

export default function ActivateAccount({ route, navigation }) {
    const [isPressed, setIsPressed] = useState(false);

    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");

    const { email } = route.params;

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

    const handleSendOTP = async () => {
        setLoading(true);
        try {
            const data = await sendOtp(email);

            if (data.success) {
                showToast("success", "Success", data.message);
                setOtpSent(true);
            } else {
                showToast("error", "Error", data.message);
                console.log(data.message);
            }
        } catch (error) {
            showToast("error", "Error", "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmOTP = async () => {
        setLoading(true);
        try {
            const token = await getToken();
            if (token) {
                const data = await activate(token, otp);

                if (data.success) {
                    showToast("success", "Success", data.message);
                    navigation.goBack();
                } else {
                    showToast("error", "Error", data.message);
                }
            }
        } catch (error) {
            showToast("error", "Error", "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (!isPressed) {
            setIsPressed(true);
            navigation.goBack();
            setTimeout(() => setIsPressed(false), 300); // Reset trạng thái sau 300 milliseconds
        }
    };

    return (
        <View style={CommonStyles.container}>
            <Text style={CommonStyles.title}>Kích hoạt tài khoản</Text>

            <TextInput style={CommonStyles.input} placeholder="Email" value={email} editable={false} />

            {otpSent && (
                <TextInput
                    style={CommonStyles.input}
                    placeholder="Enter OTP"
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="numeric"
                    maxLength={6}
                />
            )}

            {loading ? (
                <ActivityIndicator size="large" color="#6dcf5b" style={{ marginBottom: 15 }} />
            ) : (
                <>
                    {otpSent ? (
                        <TouchableOpacity style={CommonStyles.button} onPress={handleConfirmOTP}>
                            <Text style={CommonStyles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={CommonStyles.button} onPress={handleSendOTP}>
                            <Text style={CommonStyles.buttonText}>Gửi OTP</Text>
                        </TouchableOpacity>
                    )}
                </>
            )}

            <TouchableOpacity style={CommonStyles.button} onPress={handleBack}>
                <Text style={CommonStyles.buttonText}>Hủy</Text>
            </TouchableOpacity>
        </View>
    );
}
