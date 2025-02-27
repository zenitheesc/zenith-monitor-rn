import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { vh, vw } from '@/utils/utils';
import { useNavigation } from '@react-navigation/native';

export default function BluetoothScreen() {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header mode="center-aligned" elevated>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Bluetooth" />
            </Appbar.Header>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: vw(2),
        marginTop: vh(5),
    },
});
