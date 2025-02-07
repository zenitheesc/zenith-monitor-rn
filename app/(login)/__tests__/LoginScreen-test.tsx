import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { expect, describe, test, beforeEach } from '@jest/globals';
import LoginScreen from '..';
import { PaperProvider } from 'react-native-paper';
import { useRouter } from "expo-router";


jest.mock('expo-router', () => ({
    useRouter: jest.fn(() => ({
        push: jest.fn(),
        replace: jest.fn(),
        back: jest.fn(),
    })),
}));

jest.mock('react-native-paper', () => {
    const actualPaper = jest.requireActual('react-native-paper');
    return {
        ...actualPaper,
        Snackbar: ({ children }: { children: any }) => <>{children}</>,
    };
});

describe('<LoginScreen />', () => {
    beforeEach(() => {
        render(
            <LoginScreen />
        );
    });

    test('Deve renderizar o botão de Continuar com o Google', () => {
        expect(screen.getByText('Continuar com o Google')).toBeTruthy();
    });

    test('Deve renderizar o botão de Entrar sem conta', () => {
        expect(screen.getByText(' Entrar sem conta')).toBeTruthy();
    });

    test("Redireciona corretamente ao clicar em Entrar sem conta", () => {
        const mockRouter = { replace: jest.fn() };
        (useRouter as jest.Mock).mockReturnValue(mockRouter);

        const { getByText } = render(
            <PaperProvider>
                <LoginScreen />
            </PaperProvider>
        );

        const botaoEntrar = getByText("Entrar sem conta");
        fireEvent.press(botaoEntrar);
        expect(mockRouter.replace).toHaveBeenCalledWith("/(tabs)");
    });

});
