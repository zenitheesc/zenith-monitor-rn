import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ActivityIndicator, Appbar, Avatar, Card, Icon } from 'react-native-paper';
import { vw } from '../../utils/utils';
import { getAllMissionsSummary } from '@/services/MissionsSummaryApi';
import { MissionSummary } from '@/types/types';

export default function MissionsScreen({ navigation, route }: { navigation: any, route: any }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [missions, setMissions] = useState<MissionSummary[]>([]);

    const loadIndexFile = async () => {
        try {
            const response = await getAllMissionsSummary();
            setMissions(response || []);
        } catch (error) {
            console.error('Erro ao carregar o arquivo índice:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadIndexFile();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header mode="center-aligned" elevated>
                <Appbar.Content title="Missões" />
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {loading && <ActivityIndicator size="large" color="#F8BD00" />}

                {!loading && missions?.map((mission, index) => (
                    <Card
                        key={index}
                        style={styles.card}
                        onPress={() => navigation.navigate("TrajectoryScreen", { jsonUrl: mission?.download_url })}
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

                {!loading && missions.length === 0 &&
                    <Card style={styles.card}>
                        <Card.Title title="Nenhuma missão encontrada" />
                    </Card>
                }
            </ScrollView>
        </View>
    );
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