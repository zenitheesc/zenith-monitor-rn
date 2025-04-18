import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './HomeScreen';
import BluetoothScreen from './BluetoothScreen';
import BluetoothChat from './BluetoothChat';
import { BluetoothDevice } from 'react-native-bluetooth-classic';
import { View } from 'react-native';
import { RootStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeTabsScreen() {
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="BluetoothScreen"
                    component={BluetoothScreen}
                    options={{
                        title: 'Resgate via Bluetooth',
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerTintColor: '#fff',
                        headerBackground: () => (
                            <View
                                style={{
                                    backgroundColor: '#000',
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                        ),
                    }}
                />
                <Stack.Screen
                    name="BluetoothChat"
                    component={BluetoothChat}
                    options={({ route, navigation }) => ({
                        title:
                            (route.params as { device: BluetoothDevice })?.device?.name || 'Chat',
                        headerShown: true,
                        headerTitleAlign: 'center',
                        headerTintColor: '#fff',
                        headerBackground: () => (
                            <View
                                style={{
                                    backgroundColor: '#F28705',
                                    height: '100%',
                                    width: '100%',
                                }}
                            />
                        ),
                    })}
                />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
}
