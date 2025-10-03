export interface TelemetryData {
    rssi: number;
    packetId: number;
    latitude: number;
    longitude: number;
    altitude: number;
    time: string;
}

export interface Message {
    id: string;
    text: string;
    timestamp: Date;
}

export interface MessageBubbleProps {
    message: Message;
}
