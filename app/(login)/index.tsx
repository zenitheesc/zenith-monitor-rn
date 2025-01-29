import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import { useRouter } from 'expo-router'; 
import { Button } from 'react-native-paper';

export default function LoginScreen() {
    const router = useRouter(); 

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/zenith-monitor-logo.png')} 
                style={[styles.image, { width: 300, height: 300 * (9 / 16) }]}
                resizeMode="contain"
            />

            <Button
                mode="contained"
                onPress={() => router.push('(tabs)')}
                style={styles.button}
                labelStyle={styles.buttonText}
            >
                Entrar sem Login
            </Button>

            <Button
                mode="contained"
                onPress={() => console.log('Login pressed')}
                style={styles.button}
                labelStyle={styles.buttonText}
            >
                Fazer Login
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    image: {
        marginTop: -100, 
        marginBottom: 32, 
    },
    button: {
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        alignContent: 'center',
        alignItems: 'center',
        width: '60%', 
        marginBottom: 16, 
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});