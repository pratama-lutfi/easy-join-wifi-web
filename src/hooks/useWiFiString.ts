import { useMemo } from 'react';
import type { WiFiConfig } from '@/types';

export function useWiFiString(config: WiFiConfig): string {
    return useMemo(() => {
        const { ssid, password, encryption, hidden } = config;

        // Escape special characters: backslash, semi-colon, comma, colon
        const escape = (str: string) => str.replace(/([\\;,":])/g, '\\$1');

        if (!ssid) return '';

        let string = `WIFI:S:${escape(ssid)};`;

        if (encryption !== 'nopass') {
            string += `T:${encryption};P:${escape(password)};`;
        } else {
            string += `T:nopass;`;
        }

        if (hidden) {
            string += `H:true;`;
        }

        string += ';';
        return string;
    }, [config]);
}
