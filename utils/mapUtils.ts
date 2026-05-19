/**
 * Utilitário para verificar a disponibilidade e funcionamento dos provedores de mapa
 */

export const MapProviders = {
    GOOGLE: 'google' as const,
    OPENSTREETMAP: 'openstreetmap' as const,
};

export type MapProviderType = (typeof MapProviders)[keyof typeof MapProviders];

/**
 * Verifica se o Google Maps está configurado corretamente
 * @returns Promise<boolean>
 */
export const checkGoogleMapsAvailability = async (): Promise<boolean> => {
    try {
        // Verifica se a chave da API está configurada apenas via ambiente
        return !!process.env.GOOGLE_MAPS_API_KEY;
    } catch (error) {
        console.warn('Google Maps não está disponível:', error);
        return false;
    }
};

/**
 * Retorna o provedor de mapa recomendado baseado na disponibilidade
 * @returns Promise<MapProviderType>
 */
export const getRecommendedMapProvider = async (): Promise<MapProviderType> => {
    const googleMapsAvailable = await checkGoogleMapsAvailability();
    return googleMapsAvailable ? MapProviders.GOOGLE : MapProviders.OPENSTREETMAP;
};

/**
 * Configurações para diferentes tipos de mapa no OpenStreetMap
 */
export const OpenStreetMapStyles = {
    standard: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite:
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    terrain: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
};
