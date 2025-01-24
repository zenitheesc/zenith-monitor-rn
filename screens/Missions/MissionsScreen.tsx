import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { Button } from 'react-native-paper';

export default function MissionsScreen({ navigation, route }: { navigation: any; route: any }) {
    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header mode="center-aligned" elevated>
                <Appbar.Content title="Missões" />
            </Appbar.Header>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Button
                    mode="contained"
                    icon="plus"
                    onPress={() => navigation.navigate('CriarNovaCampanha')}
                    style={styles.buttonNewCampaign}
                    contentStyle={{ height: 60 }}
                    uppercase={true}
                >
                    Botão
                </Button>
            </View>
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
        justifyContent: 'center',
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
    textNewCampaign: {
        color: 'white',
        fontWeight: '700',
        alignContent: 'center',
        alignItems: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    textBarCode: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
});
