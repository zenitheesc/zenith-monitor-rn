import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MissionsScreen from './MissionsScreen';

export default function MissionsTabsScreen({ navigation, route }: { navigation: any; route: any }) {
    const Stack = createNativeStackNavigator();
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="MissionsScreen"
                    component={MissionsScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}
