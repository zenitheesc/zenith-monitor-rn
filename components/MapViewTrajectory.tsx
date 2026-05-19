import React, { useRef, useState, useEffect } from 'react';
import { Coordinates, MapViewType } from '@/types/types';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import MapView, { Polyline, Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import OpenStreetMapView from './OpenStreetMapView';

type MapProvider = 'google' | 'openstreetmap';

export default function MapViewTrajectory({
    coordinates,
    mapType,
}: {
    coordinates: Coordinates[];
    mapType: MapViewType;
}) {
    const [mapProvider, setMapProvider] = useState<MapProvider>('google');
    const [mapError, setMapError] = useState<boolean>(false);
    const startingEndingCoord =
        coordinates.length > 0 ? [coordinates[0], coordinates[coordinates.length - 1]] : [];
    let mapRef = useRef<MapView>(null);

    const fitMapCoordinates = () => {
        if (startingEndingCoord.length > 0) {
            mapRef.current?.fitToCoordinates(startingEndingCoord, {
                edgePadding: { top: 50, right: 100, bottom: 50, left: 100 },
                animated: true,
            });
        }
    };

    const switchMapProvider = () => {
        setMapProvider(mapProvider === 'google' ? 'openstreetmap' : 'google');
        setMapError(false);
    };

    return (
        <View style={styles.container}>
            {/* Botão para alternar entre provedores */}
            <View style={styles.providerSwitcher}>
                <Button
                    mode={mapProvider === 'google' ? 'contained' : 'outlined'}
                    onPress={() => setMapProvider('google')}
                    style={styles.providerButton}
                    compact
                >
                    Google Maps
                </Button>
                <Button
                    mode={mapProvider === 'openstreetmap' ? 'contained' : 'outlined'}
                    onPress={() => setMapProvider('openstreetmap')}
                    style={styles.providerButton}
                    compact
                >
                    OpenStreetMap
                </Button>
            </View>

            {coordinates.length > 0 ? (
                mapProvider === 'google' ? (
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
                        {startingEndingCoord.length > 0 && (
                            <>
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
                            </>
                        )}
                    </MapView>
                ) : (
                    <OpenStreetMapView coordinates={coordinates} mapType={mapType} />
                )
            ) : (
                <View style={styles.noDataContainer}>
                    <Text>Nenhuma coordenada disponível para exibir</Text>
                </View>
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
    providerSwitcher: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 8,
        backgroundColor: '#f5f5f5',
        gap: 8,
    },
    providerButton: {
        minWidth: 120,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
});
