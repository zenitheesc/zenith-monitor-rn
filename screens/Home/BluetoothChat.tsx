import { bluetoothService } from '@/services/BluetoothService';
import React, { useState, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, Text } from 'react-native-paper';
import { RootStackParamList } from '@/types/navigation';

interface Message {
    id: string;
    text: string;
    timestamp: Date;
}

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

    const MessageBubble = ({ message }: { message: Message }) => (
        <View style={styles.messageBubbleContainer}>
            <View style={styles.messageBubble}>
                <Text style={styles.messageText}>{message.text}</Text>
                <Text style={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </Text>
            </View>
        </View>
    );

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
        maxWidth: '80%',
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
});
