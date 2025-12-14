import { useState } from 'react';
import { Layout } from './components/Layout';
import { WiFiForm } from './components/WiFiForm';
import { QRCodeDisplay } from './components/QRCodeDisplay';
import type { WiFiConfig } from './types';

function App() {
  const [config, setConfig] = useState<WiFiConfig>({
    ssid: '',
    password: '',
    encryption: 'WPA',
    hidden: false,
  });

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full justify-center items-center">
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <WiFiForm config={config} onChange={setConfig} />
        </div>

        <div className="w-full max-w-md mx-auto lg:mx-0">
          <QRCodeDisplay config={config} />
        </div>
      </div>
    </Layout>
  );
}

export default App;
