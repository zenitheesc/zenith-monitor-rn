import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, Avatar, Card, Icon } from 'react-native-paper';
import TrajectoryScreen from './TrajectoryScreen';
import { vw } from '../../utils/utils';

export default function MissionsScreen() {
    const [currentScreen, setCurrentScreen] = useState('missions'); // 'missions' ou 'trajectory'
    const [jsonUrl, setJsonUrl] = useState('');
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        const loadIndexFile = async () => {
            try {
                const response = await fetch('https://zenitheesc.github.io/launches-data/index.json');
                const data = await response.json();
                setMissions(data); 
            } catch (error) {
                console.error('Erro ao carregar o arquivo índice:', error);
            }
        };

        loadIndexFile();
    }, []);

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
                <ScrollView contentContainerStyle={styles.cardsContainer}>
                    {missions.map((mission, index) => (
                        <Card
                            key={index}
                            style={styles.card}
                            onPress={() => showTrajectory(mission.download_url)}
                            elevation={1}
                        >
                        <Card.Title
                            title={`Missão ${index + 1} - ${mission.launch_datetime}`}
                            subtitle={`Cidade: ${mission.launch_city}\nAltitude Máxima: ${mission.max_altitude.toFixed(2)} m`}
                            subtitleNumberOfLines={2} 
                            titleNumberOfLines={1} 
                            left={(props) => <Avatar.Icon {...props} icon="map-marker-radius" />}
                            right={(props) => <Icon {...props} source="chevron-right" />}
                            style={styles.cardTitle} 
                        />
                        </Card>
                    ))}
                </ScrollView>
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
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingVertical: 5,
    },
    card: {
        margin: 5,
        marginHorizontal: vw(2),
    },
    subtitle: {
        fontSize: 14,
        lineHeight: 20, 
    },
    cardTitle: {
        height: 'auto', 
        minHeight: 100, 
    },
});