import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Badge, Button, HelperText, Snackbar } from 'react-native-paper';

export default function LoginScreen() {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Image
                    source={require('../../assets/images/zenith-monitor-logo.png')}
                    style={[styles.image, { width: 300, height: 300 * (9 / 16) }]}
                    resizeMode="contain"
                />
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                <Button
                    mode="contained"
                    onPress={() => onToggleSnackBar()}
                    icon={'google'}
                    style={styles.button}
                    labelStyle={styles.buttonText}
                >
                    Continuar com o Google

                </Button>
                <Button
                    mode="contained"
                    onPress={() => router.replace('/(tabs)')}
                    style={styles.button}
                    labelStyle={styles.buttonText}
                >
                    Entrar sem Login
                </Button>
            </View>

            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'OK',
                    onPress: () => {
                        onDismissSnackBar();
                    },
                }}>
                Indisponível. Tente novamente mais tarde.
            </Snackbar>

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
        marginBottom: 16,
    },
    button: {
        margin: 10,
    },
    buttonText: {
        padding: 12,
    },
});