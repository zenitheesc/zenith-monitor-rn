import RNBluetoothClassic, {
    BluetoothDevice,
    BluetoothDeviceReadEvent,
    BluetoothEventSubscription,
} from 'react-native-bluetooth-classic';

type DataCallback = (data: string) => void;
type DeviceCallback = (device: BluetoothDevice) => void;
type ErrorCallback = (error: any) => void;

class BluetoothService {
    private connectedDevice: BluetoothDevice | null = null;
    private dataSubscription?: BluetoothEventSubscription;
    private connectSubscription?: BluetoothEventSubscription;
    private disconnectSubscription?: BluetoothEventSubscription;
    private errorSubscription?: BluetoothEventSubscription;

    // Lista dispositivos pareados
    async getBondedDevices(): Promise<BluetoothDevice[]> {
        return await RNBluetoothClassic.getBondedDevices();
    }

    // Conecta a um dispositivo e retorna o objeto BluetoothDevice conectado
    async connect(address: string, options = {}): Promise<BluetoothDevice> {
        try {
            // Conectar diretamente usando connectToDevice
            const device = await RNBluetoothClassic.connectToDevice(address, {
                connectorType: 'rfcomm',
                DELIMITER: '\n',
                DEVICE_CHARSET: 'utf-8',
                ...options,
            });

            this.connectedDevice = device;
            return device;
        } catch (error) {
            console.error('Erro ao conectar:', error);
            throw new Error('Falha ao conectar ao dispositivo');
        }
    }

    // Desconecta do dispositivo atual
    async disconnect(): Promise<void> {
        if (this.connectedDevice) {
            await this.connectedDevice.disconnect();
            this.connectedDevice = null;
        }
    }

    // Escreve dados para o dispositivo conectado
    async write(
        data: string,
        encoding:
            | 'utf-8'
            | 'ascii'
            | 'utf8'
            | 'utf16le'
            | 'ucs2'
            | 'ucs-2'
            | 'base64'
            | 'latin1'
            | 'binary'
            | 'hex' = 'utf-8'
    ): Promise<void> {
        if (!this.connectedDevice) throw new Error('Nenhum dispositivo conectado');
        await this.connectedDevice.write(data, encoding);
    }

    // Lê dados do buffer do dispositivo conectado
    async read(): Promise<string> {
        if (!this.connectedDevice) throw new Error('Nenhum dispositivo conectado');
        const message = await this.connectedDevice.read();
        return message.toString();
    }

    // Limpa o buffer do dispositivo conectado
    async clear(): Promise<void> {
        if (!this.connectedDevice) throw new Error('Nenhum dispositivo conectado');
        await this.connectedDevice.clear();
    }

    // Verifica se está conectado
    async isConnected(): Promise<boolean> {
        if (!this.connectedDevice) return false;
        return await this.connectedDevice.isConnected();
    }

    // Listener para dados recebidos
    onDataReceived(callback: DataCallback): void {
        if (!this.connectedDevice) throw new Error('Nenhum dispositivo conectado');
        this.dataSubscription = this.connectedDevice.onDataReceived(
            (event: BluetoothDeviceReadEvent) => {
                callback(event.data);
            }
        );
    }

    // Remove todos os listeners
    removeAllListeners(): void {
        this.dataSubscription?.remove();
        this.connectSubscription?.remove();
        this.disconnectSubscription?.remove();
        this.errorSubscription?.remove();
    }

    isBluetoothAvailable(): Promise<boolean> {
        return RNBluetoothClassic.isBluetoothAvailable();
    }

    isBluetoothEnabled(): Promise<boolean> {
        return RNBluetoothClassic.isBluetoothEnabled();
    }
}

export const bluetoothService = new BluetoothService();
