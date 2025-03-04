import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import {
    ActivityIndicator,
    Appbar,
    Avatar,
    Button,
    Card,
    Chip,
    IconButton,
    Menu,
} from 'react-native-paper';
import { vw, formatDateToReadableString, convertMeterToKilometer } from '../../utils/utils';
import { getAllMissionsSummary } from '@/services/MissionsSummaryApi';
import { MissionSummary } from '@/types/types';
import ProgressStepV2 from '../../components/ProgressStepV2';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

const CLOSED_MENU_INDEX = -1;

export default function MissionsScreen({ navigation, route }: { navigation: any; route: any }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [missions, setMissions] = useState<MissionSummary[]>([]);
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const [openMenuIndex, setOpenMenuIndex] = useState(CLOSED_MENU_INDEX);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [showDropdown, setShowDropdown] = useState(false);

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
                <Appbar.Action icon="filter-menu" onPress={openMenu} />
            </Appbar.Header>
            <ScrollView contentContainerStyle={styles.cardsContainer}>
                {loading && <ActivityIndicator size="large" color="#F8BD00" />}

                {!loading &&
                    missions?.map((mission, index) => (
                        <Card
                            key={index}
                            style={styles.card}
                            onPress={() =>
                                navigation.navigate('TrajectoryScreen', {
                                    jsonUrl: mission?.download_url,
                                })
                            }
                            elevation={1}
                        >
                            <Card.Title
                                title={`Missão ${index + 1}`}
                                subtitle={formatDateToReadableString(mission.launch_datetime)}
                                left={(props) => <Avatar.Icon {...props} icon="airballoon" />}
                                right={(props) => (
                                    <Menu
                                        {...props}
                                        visible={openMenuIndex === index}
                                        onDismiss={() => setOpenMenuIndex(CLOSED_MENU_INDEX)}
                                        anchor={
                                            <IconButton
                                                icon="dots-vertical"
                                                size={30}
                                                style={{ marginTop: -25 }}
                                                onPress={() => setOpenMenuIndex(index)}
                                            />
                                        }
                                    >
                                        <Menu.Item
                                            onPress={() => {}}
                                            disabled
                                            title="Visualizar dados (.json)"
                                        />
                                    </Menu>
                                )}
                                style={styles.cardTitle}
                            />
                            <Card.Content>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flex: 1,
                                        width: '100%',
                                        alignContent: 'space-between',
                                    }}
                                >
                                    <View
                                        style={{
                                            maxHeight: 'auto',
                                            width: '50%',
                                        }}
                                    >
                                        <ProgressStepV2
                                            key={`step-indicator-${index}`}
                                            steps={[
                                                {
                                                    name: mission.launch_city,
                                                    icon: 'map-marker',
                                                },
                                                {
                                                    name: mission.launch_city,
                                                    icon: 'map-marker-radius',
                                                },
                                            ]}
                                        />
                                    </View>
                                    <View>
                                        <Chip icon="arrow-up-down" style={{ borderRadius: 25 }}>
                                            {`${convertMeterToKilometer(
                                                mission.max_altitude
                                            )} km\n`}
                                        </Chip>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    ))}

                {!loading && missions.length === 0 && (
                    <Card style={styles.card}>
                        <Card.Title title="Nenhuma missão encontrada" />
                    </Card>
                )}
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
