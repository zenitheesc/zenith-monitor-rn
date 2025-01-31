import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button } from 'react-native-paper';

export default function MenuScreen({ navigation }: { navigation: any }) {

    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: '(login)/index' }],
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header mode="center-aligned" elevated>
                <Appbar.Content title="Menu" />
            </Appbar.Header>
            
            <View style={{ flex: 1, justifyContent: 'flex-end', padding: 20 }}>
                <Button
                    mode="contained"
                    icon="logout"
                    onPress={handleLogout}
                    style={styles.button} 
                    contentStyle={styles.buttonContent} 
                    uppercase={true}
                >
                    Logout
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%', 
        borderRadius: 10,
        elevation: 0,
    },
    buttonContent: {
        height: 60, 
        justifyContent: 'center', 
    },
});