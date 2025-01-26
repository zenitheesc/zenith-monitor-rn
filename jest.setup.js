jest.mock('react-native-vector-icons', () => {
    return {
        createIconSet: jest.fn(),
        createIconSetFromFontello: jest.fn(),
        createIconSetFromIcoMoon: jest.fn(),
        createMultiStyleIconSet: jest.fn(),
        loadFont: jest.fn(),
    };
});

jest.mock('react-native-paper');

jest.mock('react-native-paper', () => {
    const reactNativePaper = jest.requireActual('react-native-paper');
    return {
        ...reactNativePaper,
        Avatar: {
            Icon: jest.fn(() => null),
        },
        Icon: jest.fn(() => null),
    };
});
