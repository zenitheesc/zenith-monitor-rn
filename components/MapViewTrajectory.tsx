import React from 'react';
import { Coordinates } from '@/types/types';
import { StyleSheet } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

export default function MapViewTrajectory({ coordinates, region }: { coordinates: Coordinates[], region: any }) {
    return (
        <MapView
            style={styles.map}
            region={region}
        >
            <Polyline
                coordinates={coordinates}
                strokeColor="#9449de"
                strokeWidth={2}
            />
            <Marker
                coordinate={coordinates[0]}
                title="Início"
                description="Ponto inicial da trajetória"
                image={require('../assets/images/balloon-start-mission-icon.png')}
            />
            <Marker
                coordinate={coordinates[coordinates.length - 1]}
                title="Fim"
                description="Ponto final da trajetória"
                image={require('../assets/images/balloon-end-mission-icon.png')}
            />
        </MapView>
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
