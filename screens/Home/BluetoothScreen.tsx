import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
    Button,
    Text,
    Snackbar,
    Appbar,
    Switch,
    ActivityIndicator,
    List,
    IconButton,
    Surface,
} from 'react-native-paper';
import { bluetoothService } from '@/services/BluetoothService';
import { bluetoothPermissions } from '@/utils/BluetoothPermissions';
import { BluetoothDevice } from 'react-native-bluetooth-classic';

export default function BluetoothScreen({ navigation }: any) {
    const [devices, setDevices] = useState<BluetoothDevice[]>([]);
    const [connected, setConnected] = useState(true);
    const [received, setReceived] = useState('');
    const [error, setError] = useState('');
    const [scanningDevices, setScanningDevices] = useState(false);
    const [bluetoothIsEnabled, setBluetoothIsEnabled] = useState(false);
    const [activatingBluetooth, setActivatingBluetooth] = useState(false);

    const scanDevices = async () => {
        try {
            setScanningDevices(true);

            // Verifica se as permissões estão concedidas antes de buscar dispositivos
            const hasPermissions = await bluetoothPermissions.checkBluetoothPermissions();

            if (!hasPermissions) {
                const granted = await bluetoothPermissions.requestPermissionsWithFeedback();
                if (!granted) {
                    setError('Permissões de Bluetooth são necessárias para buscar dispositivos');
                    return;
                }
            }

            const bonded = await bluetoothService.getBondedDevices();
            setDevices(bonded);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setScanningDevices(false);
        }
    };

    const sendTest = async () => {
        try {
            await bluetoothService.write('Teste\n');
        } catch (err: any) {
            setError(err.message);
        }
    };

    const disconnect = async () => {
        try {
            await bluetoothService.disconnect();
            setConnected(false);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const checkBluetoothEnabled = async () => {
        const enabled = await bluetoothService.isBluetoothEnabled();
        setBluetoothIsEnabled(enabled);
    };

    useEffect(() => {
        checkBluetoothEnabled();
        // Verificar permissões ao carregar a tela
        checkInitialPermissions();
    }, []);

    const checkInitialPermissions = async () => {
        try {
            const hasPermissions = await bluetoothPermissions.checkBluetoothPermissions();
            if (!hasPermissions) {
                setError(
                    'Algumas permissões de Bluetooth podem estar faltando. Toque em "Procurar Dispositivos" para configurá-las.'
                );
            }
        } catch (error) {
            console.error('Erro ao verificar permissões:', error);
        }
    };

    const handleDeviceSelect = (device: BluetoothDevice) => {
        navigation.navigate('BluetoothChat', { device });
    };

    return (
        <View style={styles.container}>
            {/* <Appbar.Header mode="center-aligned" elevated>
                <Appbar.Content title="Resgate" />
            </Appbar.Header> */}

            <Surface
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    elevation: 4,
                    backgroundColor: 'white',
                    borderRadius: 12,
                    margin: 10,
                    justifyContent: 'space-between',
                }}
            >
                <Text
                    variant="headlineLarge"
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#000',
                    }}
                >
                    Bluetooth
                </Text>
                <Switch
                    value={bluetoothIsEnabled}
                    onValueChange={() => setBluetoothIsEnabled(!bluetoothIsEnabled)}
                    style={{
                        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
                    }}
                />
            </Surface>

            <ScrollView style={{ flex: 1 }}>
                {activatingBluetooth && (
                    <Text style={{ textAlign: 'center', padding: 20 }}>Ativando Bluetooth...</Text>
                )}

                {bluetoothIsEnabled && (
                    <Button
                        mode="contained"
                        onPress={() => scanDevices()}
                        loading={scanningDevices}
                        style={{ margin: 20 }}
                    >
                        {scanningDevices ? 'Parar' : 'Procurar Dispositivos'}
                    </Button>
                )}

                {scanningDevices && (
                    <View>
                        <Text style={{ textAlign: 'center', padding: 20 }}>
                            Procurando dispositivos...
                        </Text>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                )}

                <List.Subheader>Dispositivos pareados</List.Subheader>
                {devices.length === 0 && (
                    <Text style={{ textAlign: 'center' }}>Nenhum dispositivo encontrado</Text>
                )}
                <List.Section
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 12,
                        margin: 10,
                    }}
                >
                    {devices.length > 0 &&
                        devices.map((device, idx) => (
                            <List.Item
                                key={device.address}
                                title={device.name || device.address}
                                onPress={() => handleDeviceSelect(device)}
                                style={{
                                    padding: 10,
                                    borderBottomWidth: idx === devices.length - 1 ? 0 : 1,
                                    borderBottomColor: '#ccc',
                                }}
                                titleStyle={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}
                                description={`Endereço: ${device.address}. Type: ${device.type}`}
                                descriptionStyle={{ fontSize: 14, color: '#555' }}
                                left={(props) => (
                                    <List.Icon
                                        {...props}
                                        icon="devices"
                                        style={{ alignItems: 'center' }}
                                        color="#000"
                                    />
                                )}
                                right={(props) => (
                                    <List.Icon
                                        {...props}
                                        icon="map-marker-right-outline"
                                        style={{ backgroundColor: '#fff' }}
                                        color="#000"
                                    />
                                )}
                            />
                        ))}
                </List.Section>
            </ScrollView>
            {/* Essa é uma linha de teste para enviar mensagem para a ESP.
                Ao clicar, envia a mensagem "Teste" e essa mensagem vai aparecer no console da ESP
                Também é possível enviar mensagen da ESP para o aplicativo.
                Possíveis aplicações: enviar dados de sensores, receber comandos, etc.
                */}

            {/* {connected && (
                <>
                    <Button onPress={sendTest}>Enviar Teste</Button>
                    <Button onPress={disconnect}>Desconectar</Button>
                    <Text>Recebido: {received}</Text>
                </>
            )} */}
            <Snackbar visible={!!error} onDismiss={() => setError('')}>
                {error}
            </Snackbar>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
});
