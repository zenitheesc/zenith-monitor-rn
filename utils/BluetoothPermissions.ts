import { Platform, PermissionsAndroid, Alert, Linking } from 'react-native';

export interface PermissionResult {
    granted: boolean;
    message?: string;
}

export class BluetoothPermissions {
    private static instance: BluetoothPermissions;

    static getInstance(): BluetoothPermissions {
        if (!BluetoothPermissions.instance) {
            BluetoothPermissions.instance = new BluetoothPermissions();
        }
        return BluetoothPermissions.instance;
    }

    /**
     * Solicita todas as permissões necessárias para Bluetooth
     */
    async requestBluetoothPermissions(): Promise<PermissionResult> {
        if (Platform.OS !== 'android') {
            return { granted: true };
        }

        try {
            // Para Android 12+ (API 31+) precisamos de permissões específicas
            const androidVersion = Platform.Version;

            if (androidVersion >= 31) {
                return await this.requestAndroid12Permissions();
            } else {
                return await this.requestLegacyAndroidPermissions();
            }
        } catch (error) {
            console.error('Erro ao solicitar permissões:', error);
            return {
                granted: false,
                message: 'Erro ao solicitar permissões de Bluetooth',
            };
        }
    }

    /**
     * Permissões para Android 12+ (API 31+)
     */
    private async requestAndroid12Permissions(): Promise<PermissionResult> {
        const permissions = [
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);

        const allGranted = permissions.every(
            (permission) => granted[permission] === PermissionsAndroid.RESULTS.GRANTED
        );

        if (!allGranted) {
            // Verifica quais permissões foram negadas
            const deniedPermissions = permissions.filter(
                (permission) => granted[permission] !== PermissionsAndroid.RESULTS.GRANTED
            );

            return this.handleDeniedPermissions(deniedPermissions);
        }

        return { granted: true };
    }

    /**
     * Permissões para Android < 12 (API < 31)
     */
    private async requestLegacyAndroidPermissions(): Promise<PermissionResult> {
        const permissions = [
            PermissionsAndroid.PERMISSIONS.BLUETOOTH,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);

        const allGranted = permissions.every(
            (permission) => granted[permission] === PermissionsAndroid.RESULTS.GRANTED
        );

        if (!allGranted) {
            const deniedPermissions = permissions.filter(
                (permission) => granted[permission] !== PermissionsAndroid.RESULTS.GRANTED
            );

            return this.handleDeniedPermissions(deniedPermissions);
        }

        return { granted: true };
    }

    /**
     * Verifica se todas as permissões necessárias estão concedidas
     */
    async checkBluetoothPermissions(): Promise<boolean> {
        if (Platform.OS !== 'android') {
            return true;
        }

        try {
            const androidVersion = Platform.Version;

            if (androidVersion >= 31) {
                return await this.checkAndroid12Permissions();
            } else {
                return await this.checkLegacyAndroidPermissions();
            }
        } catch (error) {
            console.error('Erro ao verificar permissões:', error);
            return false;
        }
    }

    private async checkAndroid12Permissions(): Promise<boolean> {
        const permissions = [
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ];

        const results = await Promise.all(
            permissions.map((permission) => PermissionsAndroid.check(permission))
        );

        return results.every((result) => result === true);
    }

    private async checkLegacyAndroidPermissions(): Promise<boolean> {
        const permissions = [
            PermissionsAndroid.PERMISSIONS.BLUETOOTH,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN,
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ];

        const results = await Promise.all(
            permissions.map((permission) => PermissionsAndroid.check(permission))
        );

        return results.every((result) => result === true);
    }

    private handleDeniedPermissions(deniedPermissions: string[]): PermissionResult {
        const hasBluetoothPermissions = deniedPermissions.some((permission) =>
            permission.includes('BLUETOOTH')
        );

        const hasLocationPermissions = deniedPermissions.some((permission) =>
            permission.includes('LOCATION')
        );

        let message = 'Algumas permissões foram negadas:\n';

        if (hasBluetoothPermissions) {
            message += '• Permissões de Bluetooth são necessárias para conectar com dispositivos\n';
        }

        if (hasLocationPermissions) {
            message +=
                '• Permissões de localização são necessárias para descobrir dispositivos Bluetooth\n';
        }

        message += '\nVocê pode conceder essas permissões nas configurações do aplicativo.';

        return {
            granted: false,
            message,
        };
    }

    /**
     * Mostra um alerta explicando as permissões e oferece para ir para as configurações
     */
    showPermissionAlert(message: string): Promise<boolean> {
        return new Promise((resolve) => {
            Alert.alert(
                'Permissões Necessárias',
                message,
                [
                    {
                        text: 'Cancelar',
                        style: 'cancel',
                        onPress: () => resolve(false),
                    },
                    {
                        text: 'Ir para Configurações',
                        onPress: () => {
                            Linking.openSettings();
                            resolve(true);
                        },
                    },
                ],
                { cancelable: false }
            );
        });
    }

    /**
     * Solicita permissões com feedback visual para o usuário
     */
    async requestPermissionsWithFeedback(): Promise<boolean> {
        const hasPermissions = await this.checkBluetoothPermissions();

        if (hasPermissions) {
            return true;
        }

        const result = await this.requestBluetoothPermissions();

        if (!result.granted && result.message) {
            await this.showPermissionAlert(result.message);
            return false;
        }

        return result.granted;
    }
}

export const bluetoothPermissions = BluetoothPermissions.getInstance();
