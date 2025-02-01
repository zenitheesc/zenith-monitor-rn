import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Text, Button, Avatar, Card, Icon  } from 'react-native-paper';
import TrajectoryScreen from './TrajectoryScreen';
import { vw } from '../../utils/utils';

export default function MissionsScreen() {
    const [currentScreen, setCurrentScreen] = useState('missions'); // 'missions' ou 'trajectory'
    const [jsonUrl, setJsonUrl] = useState('');

    const showTrajectory = (url) => {
        setJsonUrl(url);
        setCurrentScreen('trajectory');
    };

    const goBackToMissions = () => {
        setCurrentScreen('missions');
    };

    if (currentScreen === 'missions') {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header mode="center-aligned" elevated>
                    <Appbar.Content title="Missões" />
                </Appbar.Header>
                <View style={styles.cardsContainer}>
                    <Card
                        style={styles.card}
                        onPress={() => showTrajectory('https://zenitheesc.github.io/launches-data/000_T4220752_day_0.json')}
                        elevation={1}
                    >
                        <Card.Title
                            title="Missão 1"
                            left={(props) => <Avatar.Icon {...props} icon="map-marker-radius" />}
                            right={(props) => <Icon {...props} source="chevron-right" />}
                        />
                    </Card>

                    <Card
                        style={styles.card}
                        onPress={() => showTrajectory('https://zenitheesc.github.io/launches-data/012_J4840095_day_0.json')}
                        elevation={1}
                    >
                        <Card.Title
                            title="Missão 2"
                            left={(props) => <Avatar.Icon {...props} icon="map-marker-radius" />}
                            right={(props) => <Icon {...props} source="chevron-right" />}
                        />
                    </Card>

                    <Card
                        style={styles.card}
                        onPress={() => showTrajectory('https://zenitheesc.github.io/launches-data/005_T4150774_day_1.json')}
                        elevation={1}
                    >
                        <Card.Title
                            title="Missão 3"
                            left={(props) => <Avatar.Icon {...props} icon="map-marker-radius" />}
                            right={(props) => <Icon {...props} source="chevron-right" />}
                        />
                    </Card>

                    <Card
                        style={styles.card}
                        onPress={() => showTrajectory('https://zenitheesc.github.io/launches-data/014_J4840095_day_2.json')}
                        elevation={1}
                    >
                        <Card.Title
                            title="Missão 4"
                            left={(props) => <Avatar.Icon {...props} icon="map-marker-radius" />}
                            right={(props) => <Icon {...props} source="chevron-right" />}
                        />
                    </Card>
                </View>
            </View>
        );
    }

    if (currentScreen === 'trajectory') {
        return (
            <View style={{ flex: 1 }}>
                <Appbar.Header mode="center-aligned" elevated>
                    <Appbar.Content title="Trajetória" />
                    <Appbar.Action icon="arrow-left" onPress={goBackToMissions} />
                </Appbar.Header>
                <TrajectoryScreen jsonUrl={jsonUrl} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardsContainer: {
            flex: 1,
            justifyContent: 'flex-start',
            marginTop: 5,
        },
    card: {
        margin: 5,
        marginHorizontal: vw(2),
    },
    container: {
        flex: 1,
    },
    scrollViewContainer: {
        flexGrow: 1,
        padding: 16,
    },
});