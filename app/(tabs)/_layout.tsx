import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { BottomNavigation, Icon, PaperProvider, TouchableRipple } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import HomeScreenTabs from '@/screens/Home';
import MissionsTabsScreen from '@/screens/Missions';
import MenuTabsScreen from '@/screens/Menu';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/lib/typescript/commonjs/src/types';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            key="(tabs)"
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'dark'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}
            tabBar={({ state, descriptors, navigation, insets }: BottomTabBarProps) => (
                <BottomNavigation.Bar
                    shifting={false}
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return typeof options.tabBarIcon === 'function'
                                ? options.tabBarIcon({ focused, color, size: 24 })
                                : null;
                        }

                            return null;
                        }}
                        renderTouchable={({ key, ...props }) => (
                            <TouchableRipple key={key} {...props} />
                        )}
                        labeled={false}
                        compact={true}
                        getLabelText={({ route }) => {
                            const { options } = descriptors[route.key];
                            const label =
                                options.tabBarLabel !== undefined
                                    ? options.tabBarLabel
                                    : options.title !== undefined
                                        ? options.title
                                        : route.key;

                        return label.toString();
                    }}
                />
            )}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreenTabs}
                options={{
                    tabBarLabel: 'Início',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => {
                        return <Icon source="home" size={24} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Missions"
                component={MissionsTabsScreen}
                options={{
                    tabBarLabel: 'Missões',
                    tabBarIcon: ({ color }: { color: string }) => {
                        return <Icon source="airballoon" size={24} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Menu"
                component={MenuTabsScreen}
                options={{
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({ color }: { color: string }) => {
                        return <Icon source="menu" size={24} color={color} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
}
