import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router'; 

export default function LoginScreen({ navigation, route }: { navigation: any; route: any }) {

    return (
        <View style={styles.container}>
            <Link
                href="(tabs)"
                style={styles.link} 
            >
                <Text style={styles.linkText}>Entrar sem Login</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        backgroundColor: '#6200ee', // roxo 
        borderRadius: 4,
        paddingVertical: 16, 
        paddingHorizontal: 32, 
    },
    linkText: {
        color: 'white', 
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500', 
    },
});
