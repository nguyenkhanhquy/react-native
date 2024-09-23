import React, { useState, useEffect, useCallback } from "react";
import { ActivityIndicator, View, Text, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";

import { getListJobs } from "../../services/JobAPIService";

export default function Search({ navigation }) {
    const [search, setSearch] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);

    const [jobList, setJobList] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getListJobs();
            if (data.success) {
                setJobList(data.result);
            } else {
                Alert.alert("Error", data.message);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to fetch user information.");
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
        if (search === "") {
            setFilteredJobs([]);
        } else {
            const lowercasedSearch = search.toLowerCase();
            const filtered = jobList.filter(
                (job) =>
                    job.title.toLowerCase().includes(lowercasedSearch) ||
                    job.company.toLowerCase().includes(lowercasedSearch)
            );
            setFilteredJobs(filtered);
        }
    }, [search, jobList]);

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
        <View className="flex-1 bg-gray-100 pt-3">
            <StatusBar style="auto" />

            {/* Search bar */}
            <View className="flex-row items-center bg-white rounded-lg py-3 px-4 mx-3 mt-8 mb-4 shadow-sm">
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color="#888"
                    className="pr-3"
                    onPress={() => navigation.goBack()}
                />
                <TextInput
                    className="flex-1 text-base text-gray-700 pl-2"
                    placeholder="Tìm kiếm công việc"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                />
            </View>

            {/* Job list */}
            <FlatList
                data={filteredJobs}
                renderItem={renderJobItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 12 }}
                ListEmptyComponent={
                    <Text className="text-center text-gray-500">Không có công việc nào được tìm thấy.</Text>
                }
            />
        </View>
    );
}
