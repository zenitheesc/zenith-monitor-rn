import MapViewTrajectory from '@/components/MapViewTrajectory';
import { Coordinates } from '@/types/types';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper';

export default function TrajectoryScreen({ navigation, route }: { navigation: any; route: any }) {
    const { jsonUrl } = route.params;
    const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const loadTrajectoryData = async () => {
        try {
            const response = await fetch(jsonUrl);
            const data = await response.json();
            const trajectory = data?.map((item: any) => ({
                latitude: item?.lat,
                longitude: item?.lon,
            }));
            setCoordinates(trajectory);
        } catch (error) {
            console.error('Erro ao buscar dados de trajetória', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTrajectoryData();
    }, []);

    return (
        <View style={styles.container}>
            <Appbar.Header mode="center-aligned" elevated>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Missões" />
            </Appbar.Header>
            {loading && <ActivityIndicator size="large" color="#F8BD00" />}
            {!loading && coordinates?.length >= 1 && (
                <MapViewTrajectory coordinates={coordinates} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
