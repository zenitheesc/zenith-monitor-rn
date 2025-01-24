import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';

export default function HomeTabsScreen({ navigation, route }: { navigation: any; route: any }) {
    const Stack = createNativeStackNavigator();
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}
