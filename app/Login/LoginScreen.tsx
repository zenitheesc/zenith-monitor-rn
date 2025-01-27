import React from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // Use useRouter do expo-router

export default function LoginScreen() {
    const router = useRouter(); // Obtém o roteador

    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={() => router.push('(tabs)')} // Navega para a rota dos tabs
                style={styles.title}
                contentStyle={{ height: 60 }}
                uppercase={false}
            >
                Entrar sem Login
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        marginBottom: 20,
    },
});