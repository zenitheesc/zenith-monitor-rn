import { bluetoothService } from '@/services/BluetoothService';
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Text, Icon } from 'react-native-paper';
import { RootStackParamList } from '@/types/navigation';
import * as Clipboard from 'expo-clipboard';

interface TelemetryData {
    rssi: number;
    packetId: number;
    latitude: number;
    longitude: number;
    altitude: number;
    time: string;
}

interface Message {
    id: string;
    text: string;
    timestamp: Date;
}

type BluetoothChatProps = NativeStackScreenProps<RootStackParamList, 'BluetoothChat'>;

function parseTelemetryData(dataString: string): TelemetryData | null {
    try {
        // Remove aspas extras e espaços
        const cleanData = dataString.trim().replace(/"/g, '');

        // Divide pelos ponto e vírgula
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

function BluetoothChat({ route }: BluetoothChatProps) {
    const { device } = route.params;
    const [isConnected, setIsConnected] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const [messages, setMessages] = useState<Message[]>([]);

    const connectToDevice = async (address: string) => {
        try {
            await bluetoothService.connect(address);
            setIsConnected(true);
            bluetoothService.onDataReceived((data) => {
                const newMessage: Message = {
                    id: Date.now().toString(),
                    text: data.toString(),
                    timestamp: new Date(),
                };
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                scrollViewRef.current?.scrollToEnd({ animated: true });
            });
        } catch (err: any) {
            console.error('Error connecting to device:', err);
            setIsConnected(false);
        }
    };

    useEffect(() => {
        if (device) {
            connectToDevice(device.address);
        }

        return () => {
            bluetoothService.removeAllListeners();
            bluetoothService.disconnect();
        };
    }, []);

    const MessageBubble = ({ message }: { message: Message }) => {
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
                                <Text style={styles.packetId}>
                                    Pacote #{telemetryData.packetId}
                                </Text>
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
                                    <View style={styles.telemetryItemFull}>
                                        <View style={styles.labelWithIcon}>
                                            <Icon source="map-marker" size={12} color="#666" />
                                            <Text style={styles.telemetryLabel}>Coordenadas</Text>
                                        </View>
                                        <Text style={styles.telemetryValue}>
                                            {telemetryData.latitude.toFixed(6)},{' '}
                                            {telemetryData.longitude.toFixed(6)}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.telemetryRow}>
                                    <View style={styles.telemetryItemFull}>
                                        <View style={styles.labelWithIcon}>
                                            <Icon source="clock-outline" size={12} color="#666" />
                                            <Text style={styles.telemetryLabel}>
                                                Hora do Dispositivo
                                            </Text>
                                        </View>
                                        <Text style={styles.telemetryValue}>
                                            {telemetryData.time}
                                        </Text>
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
                                                <Icon
                                                    source="content-copy"
                                                    size={10}
                                                    color="#2196F3"
                                                />
                                                <Text style={styles.copyIndicator}>
                                                    Tocar para copiar
                                                </Text>
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

    return (
        <View style={styles.container}>
            {!isConnected && (
                <View style={styles.connectingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text style={styles.connectingText}>Conectando ao dispositivo...</Text>
                </View>
            )}

            <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={styles.scrollContent}
            >
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}
            </ScrollView>

            <View style={styles.statusBar}>
                <View
                    style={[
                        styles.statusIndicator,
                        { backgroundColor: isConnected ? '#4CAF50' : '#f44336' },
                    ]}
                />
                <Text style={styles.statusText}>{isConnected ? 'Conectado' : 'Desconectado'}</Text>
            </View>
        </View>
    );
}

export default BluetoothChat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    connectingContainer: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 1,
    },
    connectingText: {
        marginTop: 10,
        color: '#666',
    },
    messagesContainer: {
        flex: 1,
    },
    scrollContent: {
        padding: 10,
    },
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
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    statusBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 8,
    },
    statusText: {
        color: '#666',
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
        color: '#333',
        fontWeight: '600',
    },
    rawDataValue: {
        fontSize: 11,
        color: '#666',
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
});
