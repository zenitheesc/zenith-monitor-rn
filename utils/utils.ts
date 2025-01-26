import { Dimensions } from 'react-native';

export const vh = (heightValue: number) => (heightValue * Dimensions.get('window').height) / 100;
export const vw = (widthValue: number) => (widthValue * Dimensions.get('window').width) / 100;
