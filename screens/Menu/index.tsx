import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MenuScreen from './MenuScreen';

export default function MenuTabsScreen({ navigation, route }: { navigation: any; route: any }) {
    const Stack = createNativeStackNavigator();
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="MenuScreen"
                    component={MenuScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}
