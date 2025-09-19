import { bluetoothService } from '@/services/BluetoothService';
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Text } from 'react-native-paper';
import { RootStackParamList } from '@/types/navigation';
import { MessageBubble } from '@/components/Bluetooth/MessageBubble';
import { Message } from '@/types/bluetooth';

type BluetoothChatProps = NativeStackScreenProps<RootStackParamList, 'BluetoothChat'>;

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
});
