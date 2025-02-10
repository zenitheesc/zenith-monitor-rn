import React, { useEffect, useRef } from 'react';
import { Coordinates } from '@/types/types';
import { StyleSheet } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

export default function MapViewTrajectory({ coordinates }: { coordinates: Coordinates[] }) {
    const teste = [coordinates[0], coordinates[coordinates.length - 1]];
    let mapRef = useRef<MapView>(null);

    useEffect(() => {
            mapRef.current?.fitToCoordinates(teste, {
                edgePadding: { top: 50, right: 100, bottom: 50, left: 100 },
                animated: true,
            });
    }, [coordinates]);

    return (
        <>
        {coordinates.length && 
        (
            <MapView
            style={styles.map}
            ref={mapRef}
            onMapReady={() => {
                if (mapRef.current) {
                    mapRef.current.fitToCoordinates([coordinates[0], coordinates[coordinates.length - 1]], {
                        edgePadding: { top: 50, right: 100, bottom: 50, left: 100 },
                        animated: true,
                    });
                }
            }}
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
        )
        }
        
        </>
        
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
