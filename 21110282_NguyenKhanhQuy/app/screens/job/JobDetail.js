import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function JobDetail({ route, navigation }) {
    const [isPressed, setIsPressed] = useState(false);

    const { job } = route.params;

    const handleBack = () => {
        if (!isPressed) {
            setIsPressed(true);
            navigation.goBack();
            setTimeout(() => setIsPressed(false), 300); // Reset trạng thái sau 300 milliseconds
        }
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    {/* Logo (partially overlaid) */}
                    <View style={styles.logoWrapper}>
                        <Image source={{ uri: job.logo }} style={styles.logo} />
                    </View>

                    {/* Job Details */}
                    <View style={styles.jobInfoContainer}>
                        <Text style={styles.jobTitle}>{job.title}</Text>
                        <Text style={styles.company}>{job.company}</Text>
                        <View style={styles.jobInfoRow}>
                            <View style={styles.infoColumn}>
                                <Text style={styles.infoLabel}>Mức lương</Text>
                                <Text style={styles.jobValue}>{job.salary}</Text>
                            </View>
                            <View style={styles.infoColumn}>
                                <Text style={styles.infoLabel}>Địa chỉ</Text>
                                <Text style={styles.jobValue}>{job.address}</Text>
                            </View>
                            <View style={styles.infoColumn}>
                                <Text style={styles.infoLabel}>Kinh nghiệm</Text>
                                <Text style={styles.jobValue}>{job.experience}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Job Description */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Thông tin chung</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Hình thức:</Text>
                        <Text style={styles.infoValue}>{job.type}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Số lượng ứng tuyển:</Text>
                        <Text style={styles.infoValue}>{job.applicants}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Giới tính:</Text>
                        <Text style={styles.infoValue}>{job.gender}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Hạn nộp hồ sơ:</Text>
                        <Text style={styles.infoValue}>{job.deadline}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Mô tả công việc</Text>
                    <Text style={styles.sectionContent}>{job.description}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Yêu cầu ứng viên</Text>
                    <Text style={styles.sectionContent}>{job.requirements}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quyền lợi</Text>
                    <Text style={styles.sectionContent}>{job.benefits}</Text>
                </View>
            </ScrollView>

            {/* Apply Button */}
            <View style={styles.applyButtonContainer}>
                <TouchableOpacity style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Ứng tuyển ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fd",
    },
    contentContainer: {
        padding: 15,
        paddingBottom: 80,
    },
    backButton: {
        position: "absolute",
        top: 30,
        left: 15,
        backgroundColor: "#509b43",
        padding: 10,
        borderRadius: 50,
        zIndex: 10,
    },

    headerContainer: {
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 20,
        marginTop: 80,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        position: "relative",
        marginBottom: 20,
    },
    logoWrapper: {
        position: "absolute",
        top: -50,
        left: "41%",
        zIndex: 1,
        shadowColor: "#000",
        elevation: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    jobInfoContainer: {
        alignItems: "center",
        marginTop: 40,
    },
    jobTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 10,
    },
    company: {
        fontSize: 18,
        color: "#777",
        marginTop: 5,
        textAlign: "center",
        marginBottom: 10,
    },
    jobInfoRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 10,
    },
    infoColumn: {
        alignItems: "center",
    },
    infoLabel: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#666",
    },
    jobValue: {
        color: "#509b43",
        fontSize: 16,
        marginTop: 5,
    },

    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#444",
    },
    sectionContent: {
        fontSize: 16,
        color: "#666",
        lineHeight: 22,
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    label: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
    },
    infoValue: {
        fontSize: 16,
        color: "#666",
    },
    applyButtonContainer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#ddd",
    },
    applyButton: {
        backgroundColor: "#509b43",
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    applyButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
