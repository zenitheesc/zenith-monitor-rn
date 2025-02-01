import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

const TrajectoryScreen = ({ jsonUrl }) => {
    const [coordinates, setCoordinates] = useState([]);
    const [region, setRegion] = useState({
        latitude: -23.3282, 
        longitude: -51.13811,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
    });

    const loadTrajectoryData = async () => {
        try {
            const response = await fetch(jsonUrl);
            const data = await response.json();
            const trajectory = data.map(item => ({
                latitude: item.lat,
                longitude: item.lon,
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
            console.error('Erro ao carregar dados:', error);
        }
    };

    useEffect(() => {
        loadTrajectoryData();
    }, [jsonUrl]);

    return (
        <View style={styles.container}>
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
                        image={require('../../assets/images/start-icon.png')} 
                    />
                )}

                {coordinates.length > 1 && (
                    <Marker
                        coordinate={coordinates[coordinates.length - 1]}
                        title="Fim"
                        description="Ponto final da trajetória"
                        image={require('../../assets/images/end-icon.png')} 
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

export default TrajectoryScreen;
