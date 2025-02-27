import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeMainOptions from '../HomeMainOptions';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => ({
        navigate: mockNavigate,
    }),
}));

describe('<HomeMainOptions />', () => {
    it('Botão de Estufa deve ser renderizado corretamente', () => {
        const { getByText } = render(
            <NavigationContainer>
                <HomeMainOptions />
            </NavigationContainer>
        );

        expect(getByText('Estufa')).toBeTruthy();
    });

    it('Botão de Resgate com Bluetooth deve ser renderizado corretamente', () => {
        const { getByText } = render(
            <NavigationContainer>
                <HomeMainOptions />
            </NavigationContainer>
        );

        expect(getByText('Resgate com Bluetooth')).toBeTruthy();
    });

    it('Navegação para BluetoothScreen ao clicar no botão "Resgate com Bluetooth"', () => {
        const { getByText } = render(
            <NavigationContainer>
                <HomeMainOptions />
            </NavigationContainer>
        );
        const bluetoothButton = getByText('Resgate com Bluetooth');
        fireEvent.press(bluetoothButton);

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('BluetoothScreen');
    });
});
