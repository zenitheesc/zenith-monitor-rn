import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Icon, Button } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import { MessageBubbleProps, TelemetryData } from '@/types/bluetooth';

function parseTelemetryData(dataString: string): TelemetryData | null {
    try {
        const cleanData = dataString.trim().replace(/"/g, '');
        const parts = cleanData.split(';');

        if (parts.length !== 6) {
            return null;
        }

        const [rssiStr, packetIdStr, latStr, lonStr, altStr, timeStr] = parts;

        return {
            rssi: parseInt(rssiStr, 10),
            packetId: parseInt(packetIdStr, 10),
            latitude: parseFloat(latStr),
            longitude: parseFloat(lonStr),
            altitude: parseFloat(altStr),
            time: timeStr,
        };
    } catch (error) {
        return null;
    }
}

const openInGoogleMaps = async (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
        await Linking.openURL(url);
    } else {
        console.error('Não foi possível abrir o Google Maps');
    }
};

export const MessageBubble = ({ message }: MessageBubbleProps) => {
    const telemetryData = parseTelemetryData(message.text);

    return (
        <View style={styles.messageBubbleContainer}>
            <View style={styles.messageBubble}>
                {telemetryData ? (
                    <View>
                        <View style={styles.telemetryHeader}>
                            <View style={styles.titleWithIcon}>
                                <Icon source="antenna" size={16} color="#2196F3" />
                                <Text style={styles.telemetryTitle}>Dados recebidos</Text>
                            </View>
                            <Text style={styles.packetId}>Pacote #{telemetryData.packetId}</Text>
                        </View>

                        <View style={styles.telemetryGrid}>
                            <View style={styles.telemetryRow}>
                                <View style={styles.telemetryItem}>
                                    <Text style={styles.telemetryLabel}>RSSI</Text>
                                    <Text style={styles.telemetryValue}>
                                        {telemetryData.rssi} dBm
                                    </Text>
                                </View>
                                <View style={styles.telemetryItem}>
                                    <Text style={styles.telemetryLabel}>Altitude</Text>
                                    <Text style={styles.telemetryValue}>
                                        {telemetryData.altitude.toFixed(1)} m
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.telemetryRow}>
                                <View style={styles.coordinatesContainer}>
                                    <TouchableOpacity
                                        style={styles.coordinatesContent}
                                        onPress={() =>
                                            openInGoogleMaps(
                                                telemetryData.latitude,
                                                telemetryData.longitude
                                            )
                                        }
                                        activeOpacity={0.7}
                                    >
                                        <View style={styles.coordinatesHeader}>
                                            <View style={styles.labelWithIcon}>
                                                <Icon source="map-marker" size={12} color="#666" />
                                                <Text style={styles.telemetryLabel}>
                                                    Coordenadas
                                                </Text>
                                            </View>
                                        </View>
                                        <Text style={styles.telemetryValue}>
                                            {telemetryData.latitude.toFixed(6)},{' '}
                                            {telemetryData.longitude.toFixed(6)}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.mapsButton}
                                        onPress={() =>
                                            openInGoogleMaps(
                                                telemetryData.latitude,
                                                telemetryData.longitude
                                            )
                                        }
                                        activeOpacity={0.7}
                                    >
                                        <Button
                                            icon="open-in-new"
                                            mode="text"
                                            compact={true}
                                            textColor="#2196F3"
                                        >
                                            Abrir no Maps
                                        </Button>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.telemetryRow}>
                                <View style={styles.telemetryItemFull}>
                                    <View style={styles.labelWithIcon}>
                                        <Icon source="clock-outline" size={12} color="#666" />
                                        <Text style={styles.telemetryLabel}>Hora</Text>
                                    </View>
                                    <Text style={styles.telemetryValue}>{telemetryData.time}</Text>
                                </View>
                            </View>

                            <View style={styles.telemetryRow}>
                                <TouchableOpacity
                                    style={styles.telemetryItemFull}
                                    onPress={async () => {
                                        await Clipboard.setStringAsync(message.text);
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.copyHeader}>
                                        <View style={styles.labelWithIcon}>
                                            <Icon
                                                source="file-document-outline"
                                                size={12}
                                                color="#666"
                                            />
                                            <Text style={styles.telemetryLabel}>
                                                Pacote original
                                            </Text>
                                        </View>
                                        <View style={styles.labelWithIcon}>
                                            <Icon source="content-copy" size={10} color="#2196F3" />
                                            <Text style={styles.copyIndicator}>Copiar</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.rawDataValue}>{message.text}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : (
                    <Text style={styles.messageText}>{message.text}</Text>
                )}

                <Text style={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageBubbleContainer: {
        marginVertical: 5,
        alignItems: 'flex-start',
    },
    messageBubble: {
        backgroundColor: '#fff',
        borderRadius: 16,
        borderBottomLeftRadius: 4,
        padding: 12,
        maxWidth: '95%',
        minWidth: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
    },
    messageText: {
        fontSize: 16,
        color: '#333',
    },
    timestamp: {
        fontSize: 12,
        color: '#999',
        marginTop: 10,
        alignSelf: 'flex-end',
    },
    telemetryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    telemetryTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2196F3',
    },
    packetId: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    telemetryGrid: {
        gap: 8,
    },
    telemetryRow: {
        flexDirection: 'row',
        gap: 12,
    },
    telemetryItem: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 8,
        borderRadius: 6,
    },
    telemetryItemFull: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 8,
        borderRadius: 6,
    },
    telemetryLabel: {
        fontSize: 11,
        color: '#666',
        fontWeight: '500',
        marginBottom: 2,
    },
    telemetryValue: {
        fontSize: 13,
        color: '#000',
        fontWeight: '600',
    },
    rawDataValue: {
        fontSize: 11,
        color: '#000',
        fontFamily: 'monospace',
        backgroundColor: '#f0f0f0',
        padding: 4,
        borderRadius: 4,
    },
    copyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
    },
    copyIndicator: {
        fontSize: 10,
        color: '#2196F3',
        fontWeight: '500',
    },
    titleWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    labelWithIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    coordinatesContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f8f9fa',
        borderRadius: 6,
        overflow: 'hidden',
    },
    coordinatesContent: {
        flex: 1,
        padding: 8,
    },
    coordinatesHeader: {
        marginBottom: 2,
    },
    mapsButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,
    },
    mapsButtonText: {
        fontSize: 11,
        color: '#fff',
        fontWeight: '600',
    },
    mapsIndicator: {
        fontSize: 12,
        color: '#4285F4',
        fontWeight: '600',
    },
});
