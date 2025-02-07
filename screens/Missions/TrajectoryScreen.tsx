import MapViewTrajectory from '@/components/MapViewTrajectory';
import { RegionDataApi } from '@/types/types';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar } from 'react-native-paper';

const regionSPDefault: RegionDataApi = {
    latitude: -23.3282,
    longitude: -51.13811,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
}

export default function TrajectoryScreen({ navigation, route }: { navigation: any, route: any }) {
    const { jsonUrl } = route.params;
    const [coordinates, setCoordinates] = useState([]);
    const [region, setRegion] = useState({
        latitude: -23.3282,
        longitude: -51.13811,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
    });
    const [loading, setLoading] = useState<boolean>(true);

    const loadTrajectoryData = async () => {
        try {
            const response = await fetch(jsonUrl);
            const data = await response.json();
            const trajectory = data.map((item: any) => ({
                latitude: item?.lat,
                longitude: item?.lon,
            }));
            setCoordinates(trajectory);

            if (trajectory.length > 0) {
                setRegion({
                    latitude: trajectory[0].latitude,
                    longitude: trajectory[0].longitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                });
            }
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
            { loading && <ActivityIndicator size="large" color="#F8BD00" /> }
            {!loading && <MapViewTrajectory coordinates={coordinates} region={region} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
});
