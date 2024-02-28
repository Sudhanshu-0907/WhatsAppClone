import 'react-native-gesture-handler';
import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Colors from './Constant/Color';
import StackNavigator from "./navigation/StackNavigator";


export default function App() {
    return (
        <NavigationContainer>
            <StatusBar
                animated={true}
                backgroundColor={Colors.light.tint}
                barStyle='default'
                showHideTransition='fade'
            />
            <StackNavigator/>
        </NavigationContainer>
    );
}