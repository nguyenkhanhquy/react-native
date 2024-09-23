import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";

import Intro from "./app/screens/intro/Intro";
import Login from "./app/screens/auth/Login";
import Register from "./app/screens/auth/Register";
import ForgotPassword from "./app/screens/auth/ForgotPassword";
import ResetPassword from "./app/screens/auth/ResetPassword";
import Profile from "./app/screens/account/Profile";
import ChangePassword from "./app/screens/account/ChangePassword";
import ActivateAccount from "./app/screens/account/ActivateAccount";
import JobDetail from "./app/screens/job/JobDetail";
import Search from "./app/screens/job/Search";
import JobList from "./app/screens/job/JobList";

import AccountTab from "./app/screens/home/tab/AccountTab";
import HomeTab from "./app/screens/home/tab/HomeTab";
import JobConnectTab from "./app/screens/home/tab/JobConnectTab";
import CV_ProfileTab from "./app/screens/home/tab/CV_ProfileTab";
import NotificationTab from "./app/screens/home/tab/NotificationTab";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Điều hướng Bottom Tab
function MainTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "HomeTab") {
                        iconName = focused ? "home" : "home-outline";
                    } else if (route.name === "CV_ProfileTab") {
                        iconName = focused ? "document" : "document-outline";
                    } else if (route.name === "JobConnectTab") {
                        iconName = focused ? "chatbox-ellipses" : "chatbox-ellipses-outline";
                    } else if (route.name === "NotificationScreen") {
                        iconName = focused ? "notifications" : "notifications-outline";
                    } else if (route.name === "AccountTab") {
                        iconName = focused ? "person" : "person-outline";
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#16a34a",
                tabBarInactiveTintColor: "gray",
            })}
        >
            <Tab.Screen name="HomeTab" component={HomeTab} options={{ tabBarLabel: "Trang chủ" }} />
            <Tab.Screen name="CV_ProfileTab" component={CV_ProfileTab} options={{ tabBarLabel: "CV & Profile" }} />
            <Tab.Screen name="JobConnectTab" component={JobConnectTab} options={{ tabBarLabel: "Job Connect" }} />
            <Tab.Screen name="NotificationScreen" component={NotificationTab} options={{ tabBarLabel: "Thông Báo" }} />
            <Tab.Screen name="AccountTab" component={AccountTab} options={{ tabBarLabel: "Tài Khoản" }} />
        </Tab.Navigator>
    );
}

const screenOptions = {
    headerShown: false, // Ẩn header cho tất cả các màn hình
};

// Điều hướng chính của ứng dụng
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Intro" screenOptions={screenOptions}>
                <Stack.Screen name="Intro" component={Intro} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{ headerShown: true, headerTitle: "" }}
                />
                <Stack.Screen
                    name="ResetPassword"
                    component={ResetPassword}
                    options={{ headerShown: true, headerTitle: "" }}
                />
                <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={{ headerShown: true, headerTitle: "Thông tin cá nhân", headerTitleAlign: "center" }}
                />
                <Stack.Screen
                    name="ChangePassword"
                    component={ChangePassword}
                    options={{ headerShown: true, headerTitle: "Đổi mật khẩu", headerTitleAlign: "center" }}
                />
                <Stack.Screen name="ActivateAccount" component={ActivateAccount} />
                <Stack.Screen name="JobDetail" component={JobDetail} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen
                    name="JobList"
                    component={JobList}
                    options={{ headerShown: true, headerTitle: "Việc làm tốt nhất" }}
                />
            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
}
