import { render, screen } from '@testing-library/react-native';
import { expect, describe, test, beforeEach } from '@jest/globals';
import HomeMainOptions from '../HomeMainOptions';

describe('<HomeMainOptions />', () => {
    beforeEach(() => {
        render(<HomeMainOptions />);
    });

    test('Botão de Resgate com Bluetooth deve ser renderizado corretamente', () => {
        expect(screen.getByText('Resgate com Bluetooth')).toBeTruthy();
    });

    test('Botão de Estufa deve ser renderizado corretamente', () => {
        expect(screen.getByText('Estufa')).toBeTruthy();
    });
});
