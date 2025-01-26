import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Card, Icon } from 'react-native-paper';
import { vw } from '../../utils/utils';

export default function HomeMainOptions() {
    return (
        <View style={styles.cardsContainer}>
            <Card
                style={styles.card}
                onPress={() => console.log('Resgate com bluetooth')}
                elevation={1}
            >
                <Card.Title
                    title="Resgate com Bluetooth"
                    left={(props) => <Avatar.Icon {...props} icon="bluetooth" />}
                    right={(props) => <Icon {...props} source="chevron-right" />}
                />
            </Card>
            <Card
                style={styles.card}
                onPress={() => console.log('Resgate com bluetooth')}
                elevation={1}
            >
                <Card.Title
                    title="Estufa"
                    left={(props) => <Avatar.Icon {...props} icon="bluetooth" />}
                    right={(props) => <Icon {...props} source="chevron-right" />}
                />
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 40,
        height: 40,
    },
    cardsContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    card: {
        margin: 5,
        marginHorizontal: vw(2),
    },
});
