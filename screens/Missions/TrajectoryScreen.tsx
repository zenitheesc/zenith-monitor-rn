import { RegionDataApi } from '@/types/types';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { Appbar } from 'react-native-paper';

const regionSPDefault: RegionDataApi = {
    latitude: -23.3282,
    longitude: -51.13811,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
}

export default function TrajectoryScreen({ navigation, route }: { navigation: any, route: any }) {
    const { jsonUrl } = route.params;
    const [coordinates, setCoordinates] = useState([]);
    const [region, setRegion] = useState(regionSPDefault);

    const loadTrajectoryData = async () => {
        try {
            const response = await fetch(jsonUrl);
            const data = await response.json();
            const trajectory = data.map((item: any) => ({
                latitude: item.latitude,
                longitude: item.longitude,
            }));
            setCoordinates(trajectory);
            console.log('Trajetória:', trajectory);

            if (trajectory.length > 0) {
                setRegion({
                    latitude: trajectory[0].latitude,
                    longitude: trajectory[0].longitude,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                });
            }
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
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
            <MapView
                style={styles.map}
                region={region}
            >
                {coordinates.length > 0 && (
                    <Polyline
                        coordinates={coordinates}
                        strokeColor="#9449de"
                        strokeWidth={2}
                    />
                )}

                {coordinates.length > 0 && (
                    <Marker
                        coordinate={coordinates[0]}
                        title="Início"
                        description="Ponto inicial da trajetória"
                        image={require('../../assets/images/balloon-start-mission-icon.png')}
                    />
                )}

                {coordinates.length > 1 && (
                    <Marker
                        coordinate={coordinates[coordinates.length - 1]}
                        title="Fim"
                        description="Ponto final da trajetória"
                        image={require('../../assets/images/balloon-end-mission-icon.png')}
                    />
                )}
            </MapView>
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
