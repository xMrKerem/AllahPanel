import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Panel from "../Panel"
import List from "../List"
import CennetCehennem from "../CennetCehennem"
import * as React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { TouchableOpacity, Text, Alert, Linking } from "react-native";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const showInfo = () => {
    Alert.alert(
        "Bilgilendirme", "Allah Panel Discord Sunucusuna katılmak için aşağıdaki butona tıklayınız.", [{
                text: "Discord'a Git",
                onPress: () => Linking.openURL("https://discord.gg/kXCUNVE5Qc")
            },
            { text: "İptal", style: "cancel" }
        ]
    )
}

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Panel"
            screenOptions={{
                tabBarActiveTintColor: "#e91e63",
                tabBarLabelStyle: { fontSize: 12 },
                tabBarStyle: { backgroundColor: "white" },
                tabBarHideOnKeyboard: true,
                headerRight: () => (
                    <TouchableOpacity onPress={showInfo} style={{marginRight: 15}}>
                        <Text>Bilgi</Text>
                    </TouchableOpacity>
                )
            }}
        >
            <Tab.Screen name="Cennet Cehennem" component={CennetCehennem} options={{ tabBarLabel: "Cennet Cehennem" }} />
            <Tab.Screen name="Panel" component={Panel} options={{ tabBarLabel: "Panel" }} />
            <Tab.Screen name="List" component={List} options={{ tabBarLabel: "Peygamberler" }} />


        </Tab.Navigator>
    );
}

export default function Navigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTabs"
                component={MyTabs}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}