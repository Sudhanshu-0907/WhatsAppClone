import React from "react";
import Colors from "../Constant/Color";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Text, useColorScheme, View} from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";

function HomeScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

export default function MainTabNavigator() {
    const colorScheme = useColorScheme();
    return (
        <Tab.Navigator
            initialRouteName="Chat"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme].background,
                tabBarStyle: {
                    backgroundColor: Colors[colorScheme].tint,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: Colors[colorScheme].background,
                    height: 4,
                },
                tabBarLabelStyle: {
                    fontWeight: 'bold'

                },
                tabBarShowIcon: true,

            }}
        >
            <Tab.Screen name="Camera" component={HomeScreen} options={{
                tabBarIcon: ({color}) => <Fontisto name="camera" color={color} size={18}/>,
                tabBarLabel: () => null
            }}/>
            <Tab.Screen name="Chat" component={SettingsScreen}/>
            <Tab.Screen name="Status" component={SettingsScreen}/>
            <Tab.Screen name="Calls" component={SettingsScreen}/>
        </Tab.Navigator>
    );
}
