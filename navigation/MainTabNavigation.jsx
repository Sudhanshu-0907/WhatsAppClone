import React from "react";
import Colors from "../Constant/Color";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import ChatScreen from "../Screen/ChatScreen";
import { signOut } from 'aws-amplify/auth';

async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

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
            <TouchableOpacity onPress={handleSignOut}>
              <Text>SignOut</Text>
            </TouchableOpacity>
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
            <Tab.Screen name="Chat" component={ChatScreen}/>
            <Tab.Screen name="Status" component={SettingsScreen}/>
            <Tab.Screen name="Calls" component={SettingsScreen}/>
        </Tab.Navigator>
    );
}
