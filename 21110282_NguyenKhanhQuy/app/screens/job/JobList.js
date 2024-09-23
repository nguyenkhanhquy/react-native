import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, View, Text, TextInput, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { getListJobs } from "../../services/JobAPIService";

import { StatusBar } from "expo-status-bar";

export default function JobList({ navigation }) {
    const [search, setSearch] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [jobList, setJobList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(5);
    const [selectedLocation, setSelectedLocation] = useState("all"); // Giá trị mặc định cho khu vực

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getListJobs();
            if (data.success) {
                setJobList(data.result);
                setFilteredJobs(data.result.slice(0, visibleCount));
            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to fetch job information.");
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    useEffect(() => {
        const filterJobs = () => {
            let updatedJobs = jobList;

            // Lọc theo khu vực nếu có
            if (selectedLocation !== "all") {
                updatedJobs = updatedJobs.filter((job) => job.address === selectedLocation);
            }

            // Lọc theo từ khóa tìm kiếm
            if (search) {
                const lowercasedSearch = search.toLowerCase();
                updatedJobs = updatedJobs.filter(
                    (job) =>
                        job.title.toLowerCase().includes(lowercasedSearch) ||
                        job.company.toLowerCase().includes(lowercasedSearch) ||
                        job.address.toLowerCase().includes(lowercasedSearch)
                );
            }

            setFilteredJobs(updatedJobs.slice(0, visibleCount));
        };

        filterJobs();
    }, [search, jobList, visibleCount, selectedLocation]);

    const loadMoreJobs = () => {
        if (filteredJobs.length < jobList.length) {
            setTimeout(() => {
                setVisibleCount((prevCount) => prevCount + 5); // Tải thêm 5 công việc
            }, 500); // Độ trễ 500ms
        }
    };

    const renderJobItem = ({ item }) => (
        <TouchableOpacity
            className="flex-row bg-white p-4 rounded-lg mb-4 shadow-sm"
            onPress={() => navigation.navigate("JobDetail", { job: item })}
        >
            <Image source={{ uri: item.logo }} className="w-16 h-16 rounded-lg mr-4" />
            <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900 mb-1">{item.title}</Text>
                <Text className="text-sm text-gray-600 mb-2">{item.company}</Text>
                <View className="flex-row space-x-2 mb-2">
                    <Text className="text-sm text-gray-700 bg-gray-100 py-1 px-2 rounded-md">{item.address}</Text>
                    <Text className="text-sm text-gray-700 bg-gray-100 py-1 px-2 rounded-md">{item.experience}</Text>
                </View>
                <View className="flex-row space-x-2 mb-2">
                    <Text className="text-sm text-green-600 bg-[#e8f5e9] py-1 px-2 rounded-md">{item.salary}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <StatusBar style="auto" />
                <ActivityIndicator size="large" color="#16a34a" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-100">
            <StatusBar style="auto" />

            {/* Search bar */}
            <View className="bg-white pt-2">
                <View className="flex-row items-center bg-gray-100 rounded-lg py-2 px-4 mx-3 mb-2 shadow-sm">
                    <Ionicons name="search" size={24} color="#888" className="mr-3" />
                    <TextInput
                        className="flex-1 text-base text-gray-700"
                        placeholder="Địa điểm - Công ty - Công việc"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>

                {/* Combobox khu vực */}
                <View className="mx-3">
                    <Picker
                        selectedValue={selectedLocation}
                        onValueChange={(itemValue) => setSelectedLocation(itemValue)}
                        style={{ height: 50, width: "100%" }}
                    >
                        <Picker.Item label="Tất cả khu vực" value="all" />
                        <Picker.Item label="Hà Nội" value="Hà Nội" />
                        <Picker.Item label="Hồ Chí Minh" value="Hồ Chí Minh" />
                        <Picker.Item label="Đà Nẵng" value="Đà Nẵng" />
                    </Picker>
                </View>
            </View>

            {/* Job list */}
            <FlatList
                data={filteredJobs}
                renderItem={renderJobItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 12 }}
                onEndReached={loadMoreJobs}
                onEndReachedThreshold={0.1}
                extraData={visibleCount}
            />
        </View>
    );
}
