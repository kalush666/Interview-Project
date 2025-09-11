// Firebase Configuration Test
import { auth } from '../config/firebase.database';

export const testFirebaseConfig = () => {
  console.log('🔧 Firebase Auth Config Test:');
  console.log('Auth instance:', auth);
  console.log('Auth app config:', auth.app.options);
  console.log('Environment variables:', {
    API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
    AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    DATABASE_URL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  });
  
  // Check if any emulator connections exist
  console.log('Auth emulator host:', (auth as any)._delegate?.emulatorConfig?.host);
  
  return {
    isProduction: !auth.app.options.projectId?.includes('demo'),
    projectId: auth.app.options.projectId,
    authDomain: auth.app.options.authDomain,
  };
};

// Auto-run the test
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => testFirebaseConfig(), 1000);
  });
}
