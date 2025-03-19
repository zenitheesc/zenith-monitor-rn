import React from 'react';
import { render, fireEvent, waitForElementToBeRemoved } from '@testing-library/react-native';
import MenuScreen from '../MenuScreen';
import { NavigationContainer } from '@react-navigation/native';

const mockNavigationReset = jest.fn();

describe('<MenuScreen />', () => {

    it('Botão de Logout deve ser renderizado corretamente', () => {
        const { getByText } = render(
            <NavigationContainer>
                <MenuScreen navigation={{ reset: mockNavigationReset }} />
            </NavigationContainer>
        );

        expect(getByText('Logout')).toBeTruthy();
    });

    it('Card de Confirmação de Logout deve aparecer quando o botão for pressionado', () => {
        const { getByText, queryByText } = render(
            <NavigationContainer>
                <MenuScreen navigation={{ reset: mockNavigationReset }} />
            </NavigationContainer>
        );

        expect(queryByText('Você tem certeza que deseja sair?')).toBeNull();
        fireEvent.press(getByText('Logout'));
        expect(getByText('Você tem certeza que deseja sair?')).toBeTruthy();
    });

    it('Confirmação do Logout deve chamar a função de reset da navegação', () => {
        const { getByText } = render(
            <NavigationContainer>
                <MenuScreen navigation={{ reset: mockNavigationReset }} />
            </NavigationContainer>
        );

        fireEvent.press(getByText('Logout'));
        fireEvent.press(getByText('Sim'));

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
    
        fireEvent.press(getByText('Logout'));
        fireEvent.press(getByText('Não'));
    
        await waitForElementToBeRemoved(() => queryByText('Você tem certeza que deseja sair?'));
    });
    
    
});
