import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen({ navigation, route }: { navigation: any; route: any }) {
    return (
        <View>
            <Appbar.Header mode="center-aligned" elevated>
                <Appbar.Content title="Início" />
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
});
