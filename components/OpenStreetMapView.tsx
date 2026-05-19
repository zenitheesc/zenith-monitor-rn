import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Coordinates } from '@/types/types';
import { OpenStreetMapStyles } from '@/utils/mapUtils';

interface OpenStreetMapViewProps {
    coordinates: Coordinates[];
    mapType?: 'standard' | 'satellite' | 'terrain';
}

const { width, height } = Dimensions.get('window');

export default function OpenStreetMapView({
    coordinates,
    mapType = 'standard',
}: OpenStreetMapViewProps) {
    // Calcular centro do mapa baseado nas coordenadas
    const center =
        coordinates.length > 0
            ? {
                  lat:
                      coordinates.reduce((sum, coord) => sum + coord.latitude, 0) /
                      coordinates.length,
                  lng:
                      coordinates.reduce((sum, coord) => sum + coord.longitude, 0) /
                      coordinates.length,
              }
            : { lat: -23.5505, lng: -46.6333 }; // São Paulo como fallback

    // Converter coordenadas para formato compatível com Leaflet
    const polylineCoords = coordinates.map((coord) => [coord.latitude, coord.longitude]);

    // Definir estilo do mapa baseado no tipo
    const getMapStyle = () => {
        switch (mapType) {
            case 'satellite':
                return OpenStreetMapStyles.satellite;
            case 'terrain':
                return OpenStreetMapStyles.terrain;
            default:
                return OpenStreetMapStyles.standard;
        }
    };

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>OpenStreetMap Trajectory</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
            body { margin: 0; padding: 0; }
            #map { height: 100vh; width: 100vw; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
            // Inicializar mapa
            var map = L.map('map').setView([${center.lat}, ${center.lng}], 10);

            // Adicionar camada de tiles
            L.tileLayer('${getMapStyle()}', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18,
            }).addTo(map);

            // Adicionar trajetória se houver coordenadas
            ${
                coordinates.length > 0
                    ? `
            var polylineCoords = ${JSON.stringify(polylineCoords)};
            var polyline = L.polyline(polylineCoords, {color: '#9449de', weight: 3}).addTo(map);
            
            // Adicionar marcadores de início e fim
            if (polylineCoords.length > 0) {
                var startIcon = L.divIcon({
                    html: '<div style="background-color: #22c55e; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">S</div>',
                    iconSize: [20, 20],
                    className: 'custom-div-icon'
                });
                
                var endIcon = L.divIcon({
                    html: '<div style="background-color: #ef4444; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">E</div>',
                    iconSize: [20, 20],
                    className: 'custom-div-icon'
                });
                
                L.marker(polylineCoords[0], {icon: startIcon})
                    .addTo(map)
                    .bindPopup('Início da trajetória');
                    
                L.marker(polylineCoords[polylineCoords.length - 1], {icon: endIcon})
                    .addTo(map)
                    .bindPopup('Fim da trajetória');
                
                // Ajustar visualização para mostrar toda a trajetória
                map.fitBounds(polyline.getBounds(), {padding: [20, 20]});
            }
            `
                    : ''
            }
        </script>
    </body>
    </html>
    `;

    return (
        <View style={styles.container}>
            <WebView
                source={{ html: htmlContent }}
                style={styles.webview}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                mixedContentMode="compatibility"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
        width: width,
        height: height,
    },
});
