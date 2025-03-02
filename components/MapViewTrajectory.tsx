import React, { useRef } from 'react';
import { Coordinates, MapViewType } from '@/types/types';
import { StyleSheet } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapViewTrajectory({
    coordinates,
    mapType,
}: {
    coordinates: Coordinates[];
    mapType: MapViewType;
}) {
    const startingEndingCoord = [coordinates[0], coordinates[coordinates.length - 1]];
    let mapRef = useRef<MapView>(null);

    const fitMapCoordinates = () => {
        mapRef.current?.fitToCoordinates(startingEndingCoord, {
            edgePadding: { top: 50, right: 100, bottom: 50, left: 100 },
            animated: true,
        });
    };

    return (
        <React.Fragment>
            {coordinates.length && (
                <MapView
                    style={styles.map}
                    ref={mapRef}
                    onMapReady={() => {
                        fitMapCoordinates();
                    }}
                    mapType={mapType}
                    provider={PROVIDER_GOOGLE}
                >
                    <Polyline coordinates={coordinates} strokeColor="#9449de" strokeWidth={2} />
                    <Marker
                        coordinate={startingEndingCoord[0]}
                        title="Início"
                        description="Ponto inicial da trajetória"
                        image={require('../assets/images/balloon-start-mission-icon.png')}
                    />
                    <Marker
                        coordinate={startingEndingCoord[1]}
                        title="Fim"
                        description="Ponto final da trajetória"
                        image={require('../assets/images/balloon-end-mission-icon.png')}
                    />
                </MapView>
            )}
        </React.Fragment>
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
