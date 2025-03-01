import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigator from "./Navigator/Navigator";
import { NavigationContainer } from '@react-navigation/native'

export default function Index() {
    return (
        <SafeAreaProvider style={{flex: 1}}>
            <Navigator />
        </SafeAreaProvider>
    );
}