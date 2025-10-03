import { BluetoothDevice } from 'react-native-bluetooth-classic';

export type RootStackParamList = {
    HomeScreen: undefined;
    BluetoothScreen: undefined;
    BluetoothChat: {
        device: BluetoothDevice;
    };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
