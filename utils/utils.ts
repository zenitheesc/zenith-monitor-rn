import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dimensions } from 'react-native';

export const vh = (heightValue: number) => (heightValue * Dimensions.get('window').height) / 100;
export const vw = (widthValue: number) => (widthValue * Dimensions.get('window').width) / 100;

export const formatDateToReadableString = (dateInfo: string) => {
    const date = new Date(dateInfo);
    const currentYear = new Date().getFullYear();
    const dateYear = date.getFullYear();

    return format(
        date,
        dateYear === currentYear ? 'EEEEEE., dd MMM' : "EEEEEE., dd MMM 'de' yyyy",
        {
            locale: ptBR,
        }
    );
};

export const convertMeterToKilometer = (meters: number) => {
    return (meters / 1000).toFixed(2);
};
