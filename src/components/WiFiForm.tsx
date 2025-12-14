import { useState } from 'react';
import { Eye, EyeOff, Wifi } from 'lucide-react';
import type { WiFiConfig, EncryptionType } from '@/types';

interface WiFiFormProps {
    config: WiFiConfig;
    onChange: (config: WiFiConfig) => void;
}

export function WiFiForm({ config, onChange }: WiFiFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (key: keyof WiFiConfig, value: WiFiConfig[keyof WiFiConfig]) => {
        onChange({ ...config, [key]: value });
    };

    return (
        <div className="glass-panel p-6 w-full max-w-md space-y-6 text-white">
            <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-indigo-500/20 rounded-full">
                    <Wifi className="w-6 h-6 text-indigo-300" />
                </div>
                <h2 className="text-xl font-semibold">Network Details</h2>
            </div>

            <div className="space-y-4">
                {/* SSID Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Network Name (SSID)</label>
                    <input
                        type="text"
                        value={config.ssid}
                        onChange={(e) => handleChange('ssid', e.target.value)}
                        placeholder="e.g. MyHomeWiFi"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium"
                    />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={config.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            disabled={config.encryption === 'nopass'}
                            placeholder={config.encryption === 'nopass' ? "No password required" : "Enter password"}
                            className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium ${config.encryption === 'nopass' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        />
                        {config.encryption !== 'nopass' && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        )}
                    </div>
                </div>

                {/* Encryption Type */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 ml-1">Security</label>
                        <select
                            value={config.encryption}
                            onChange={(e) => handleChange('encryption', e.target.value as EncryptionType)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none cursor-pointer"
                        >
                            <option value="WPA" className="bg-gray-800">WPA/WPA2/WPA3</option>
                            <option value="WEP" className="bg-gray-800">WEP</option>
                            <option value="nopass" className="bg-gray-800">None</option>
                        </select>
                    </div>

                    {/* Hidden Network Checkbox */}
                    <div className="flex items-center pt-8 px-1">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={config.hidden}
                                    onChange={(e) => handleChange('hidden', e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-10 h-6 rounded-full shadow-inner transition-colors ${config.hidden ? 'bg-indigo-500' : 'bg-white/10'}`}></div>
                                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${config.hidden ? 'translate-x-4' : 'translate-x-0'}`}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">Hidden Network</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
