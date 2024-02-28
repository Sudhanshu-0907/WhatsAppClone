import React from "react";
import Colors from "../Constant/Color";
import {View} from "react-native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabNavigator from "./MainTabNavigation";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ChatRoomScreen from "../Screen/ChatRoomScreen";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const Stack = createNativeStackNavigator();

export default function StackNavigator() {

    return (
        <Stack.Navigator screenOptions={{
            // headerShadowVisible: 'false',
            headerTransparent: 'true',
            headerStyle: {
                backgroundColor: Colors.light.tint,
                shadowOpacity: 0,
                elevation: 0,
            },
            headerTintColor: Colors.light.background,
            headerTitleAlign: 'left',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}>
            <Stack.Screen
                name="Root"
                component={MainTabNavigator}
                options={{
                    title: "WhatsApp",
                    headerRight: () => (
                        <View style={{
                            flexDirection: 'row',
                            width: 60,
                            justifyContent: 'space-between',
                            marginRight: 10,
                        }}>
                            <Octicons name="search" size={22} color={'white'}/>
                            <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'}/>
                        </View>
                    )
                }}
            />
            <Stack.Screen
                name="ChatRoom"
                component={ChatRoomScreen}
                options={({route}) => ({
                    title: route.params.name,
                    headerRight: () => (
                        <View style={{
                            flexDirection: 'row',
                            width: 100,
                            justifyContent: 'space-between',
                            marginRight: 10,
                        }}>
                            <FontAwesome5 name="video" size={22} color={'white'}/>
                            <MaterialIcons name="call" size={22} color={'white'}/>
                            <MaterialCommunityIcons name="dots-vertical" size={22} color={'white'}/>
                        </View>
                    ),
                    animation: 'slide_from_right'
                })}
            />
            {/*<Stack.Screen*/}
            {/*    name="Contacts"*/}
            {/*    component={ContactsScreen}*/}
            {/*/>*/}
            {/*<Stack.Screen name="NotFound" component={NotFoundScreen} options={{title: 'Oops!'}}/>*/}
        </Stack.Navigator>
    )
}
