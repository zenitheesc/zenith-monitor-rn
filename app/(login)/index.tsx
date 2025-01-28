import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; 
import { Button } from 'react-native-paper';

export default function LoginScreen() {
    const router = useRouter(); 
    return (
        <View style={styles.container}>
            <Button
                mode="contained"
                onPress={() => router.push('(tabs)')} 
                style={styles.button}
                contentStyle={{ height: 60 }}
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
    button: {
        borderRadius: 10,
        elevation: 0,
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});