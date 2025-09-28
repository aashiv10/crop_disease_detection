
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6b04a77f91594471bd95ce1d048869a7',
  appName: 'Plant Disease Detector',
  webDir: 'dist',
  server: {
    url: 'https://6b04a77f-9159-4471-bd95-ce1d048869a7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      compileSdkVersion: 34,
      targetSdkVersion: 34,
      minSdkVersion: 24
    }
  }
};

export default config;
