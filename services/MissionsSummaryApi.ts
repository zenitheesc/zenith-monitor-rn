import axios from 'axios';
import config from './config';

const MissionsSummaryApi = axios.create({ baseURL: config.LaunchesDataApi });

export async function getAllMissionsSummary() {
    try {
        const response = await MissionsSummaryApi.get('/index.json');
        return response.data;
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
    }
}
