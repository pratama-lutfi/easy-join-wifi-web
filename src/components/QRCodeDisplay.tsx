import { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Printer, Download, QrCode } from 'lucide-react';
import type { WiFiConfig } from '../types';
import { useWiFiString } from '../hooks/useWiFiString';

interface QRCodeDisplayProps {
    config: WiFiConfig;
}

export function QRCodeDisplay({ config }: QRCodeDisplayProps) {
    const customString = useWiFiString(config);
    const qrRef = useRef<HTMLDivElement>(null);

    const handleDownload = (format: 'png' | 'svg') => {
        const canvas = qrRef.current?.querySelector('canvas');
        if (!canvas) return;

        if (format === 'png') {
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `wifi-qr-${config.ssid || 'network'}.png`;
            link.href = url;
            link.click();
        }
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="glass-panel p-6 w-full max-w-md flex flex-col items-center justify-center text-white space-y-6">
            <div className="flex items-center space-x-3 mb-2 w-full">
                <div className="p-3 bg-emerald-500/20 rounded-full">
                    <QrCode className="w-6 h-6 text-emerald-300" />
                </div>
                <h2 className="text-xl font-semibold">Your QR Code</h2>
            </div>

            <div
                className="p-4 bg-white rounded-2xl shadow-2xl relative group print:shadow-none print:border-2 print:border-black"
                ref={qrRef}
            >
                <QRCodeCanvas
                    value={customString}
                    size={250}
                    level={'H'}
                    includeMargin={true}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    style={{ borderRadius: '12px' }}
                />
                {/* Printable Card content only visible in print */}
                <div className="hidden print:block text-black text-center mt-4">
                    <p className="font-bold text-xl mb-1">Wi-Fi Login</p>
                    <p className="text-sm">Scan to connect to:</p>
                    <p className="font-mono text-lg font-bold mt-1">{config.ssid}</p>
                    {config.encryption !== 'nopass' && (
                        <div className="mt-2 text-xs text-gray-600 border-t border-gray-300 pt-2">
                            <p>Password: <span className="font-mono font-bold text-black">{config.password}</span></p>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 print:hidden">
                <button
                    onClick={handlePrint}
                    className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 border border-white/10 py-3 rounded-xl transition-all font-medium active:scale-95"
                    disabled={!config.ssid}
                >
                    <Printer size={18} />
                    <span>Print</span>
                </button>
                <button
                    onClick={() => handleDownload('png')}
                    className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl transition-all font-medium shadow-lg shadow-indigo-500/20 active:scale-95"
                    disabled={!config.ssid}
                >
                    <Download size={18} />
                    <span>Save PNG</span>
                </button>
            </div>

            {!config.ssid && (
                <div className="text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-lg">
                    Top Tip: Enter your network name to generate a valid QR code.
                </div>
            )}
        </div>
    );
}
