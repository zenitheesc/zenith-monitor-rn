import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import HomeMainOptions from './HomeMainOptions';
import { vh, vw } from '@/utils/utils';

export default function HomeScreen({ navigation, route }: { navigation: any; route: any }) {
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header mode="center-aligned" elevated>
                <Appbar.Content title="Início" />
            </Appbar.Header>
            <HomeMainOptions />
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 40,
        height: 40,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: vw(2),
        marginTop: vh(5),
    },
    viewContainer: {
        padding: 2,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonNewCampaign: {
        borderRadius: 10,
        elevation: 0,
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
});
