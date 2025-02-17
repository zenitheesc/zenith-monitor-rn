import MapViewTrajectory from '@/components/MapViewTrajectory';
import { MAP_VIEW_TYPES } from '@/types/constants';
import { Coordinates, MapViewType } from '@/types/types';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrajectoryScreen({ navigation, route }: { navigation: any; route: any }) {
    const { jsonUrl } = route.params;
    const [coordinates, setCoordinates] = useState<Coordinates[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState(false);
    const [mapType, setMapType] = useState<MapViewType>(MAP_VIEW_TYPES.STANDARD);

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

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const changeMapType = (type: MapViewType) => {
        setMapType(type);
        closeMenu();
    };

    useEffect(() => {
        loadTrajectoryData();
    }, []);

    return (
        <View style={styles.container}>
            <Appbar.Header mode="center-aligned" elevated>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="Missões" />
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
                >
                    <SafeAreaView>
                        <Menu.Item
                            onPress={() => changeMapType(MAP_VIEW_TYPES.STANDARD)}
                            title="Mapa"
                        />
                        <Menu.Item
                            onPress={() => changeMapType(MAP_VIEW_TYPES.SATELLITE)}
                            title="Satélite"
                        />
                        <Menu.Item
                            onPress={() => changeMapType(MAP_VIEW_TYPES.TERRAIN)}
                            title="Terreno"
                        />
                    </SafeAreaView>
                </Menu>
            </Appbar.Header>

            {loading && <ActivityIndicator size="large" color="#F8BD00" />}
            {!loading && coordinates?.length >= 1 && (
                <MapViewTrajectory coordinates={coordinates} mapType={mapType} />
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
