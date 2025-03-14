import { MAP_VIEW_TYPES } from './constants';

// aqui o undefined indica que não há parâmetros a serem passados para a tela
export type HomeStackParamList = {
    Home: undefined;
    BluetoothScreen: undefined;
    Estufa: undefined;
};

export type MissionsStackParamList = {
    Missions: undefined;
    Trajectory: {
        trajectory_url: string;
    };
};

export type RegionDataApi = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
};

export type MissionSummary = {
    name: string;
    download_url: string;
    launch_city: string;
    landing_city: string;
    max_altitude: number;
    launch_datetime: string;
};

export type Coordinates = {
    latitude: number;
    longitude: number;
};

export type MapViewType = (typeof MAP_VIEW_TYPES)[keyof typeof MAP_VIEW_TYPES];
