import React from 'react';
import { render, fireEvent, waitForElementToBeRemoved, act } from '@testing-library/react-native';
import MenuScreen from '../MenuScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Portal, Modal } from 'react-native-paper';

const mockNavigationReset = jest.fn();

jest.mock('react-native-paper', () => {
    const actual = jest.requireActual('react-native-paper');
    return {
        ...actual,
        Portal: ({ children }: { children: React.ReactNode }) => children,
        Modal: ({ visible, children }: { visible: boolean; children: React.ReactNode }) =>
            visible ? children : null,
    };
});

describe('<MenuScreen />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Botão de Logout deve ser renderizado corretamente', () => {
        const { getByText } = render(
            <NavigationContainer>
                <MenuScreen navigation={{ reset: mockNavigationReset }} />
            </NavigationContainer>
        );

        expect(getByText('Logout')).toBeTruthy();
    });

    it('Card de Confirmação de Logout deve aparecer quando o botão for pressionado', async () => {
        const { getByText, queryByText } = render(
            <NavigationContainer>
                <MenuScreen navigation={{ reset: mockNavigationReset }} />
            </NavigationContainer>
        );

        expect(queryByText('Você tem certeza que deseja sair?')).toBeNull();
        await act(async () => {
            fireEvent.press(getByText('Logout'));
        });
        expect(getByText('Você tem certeza que deseja sair?')).toBeTruthy();
    });

    it('Confirmação do Logout deve chamar a função de reset da navegação', async () => {
        const { getByText } = render(
            <NavigationContainer>
                <MenuScreen navigation={{ reset: mockNavigationReset }} />
            </NavigationContainer>
        );

        await act(async () => {
            fireEvent.press(getByText('Logout'));
        });
        await act(async () => {
            fireEvent.press(getByText('Sim'));
        });

        expect(mockNavigationReset).toHaveBeenCalledWith({
            index: 0,
            routes: [{ name: '(login)/index' }],
        });
    });

    it('Cancelar o Logout deve fechar o modal', async () => {
        const { getByText, queryByText } = render(
            <NavigationContainer>
                <MenuScreen navigation={{ reset: jest.fn() }} />
            </NavigationContainer>
        );

        await act(async () => {
            fireEvent.press(getByText('Logout'));
        });

        await act(async () => {
            fireEvent.press(getByText('Não'));
        });

        expect(queryByText('Você tem certeza que deseja sair?')).toBeNull();
    });
});
