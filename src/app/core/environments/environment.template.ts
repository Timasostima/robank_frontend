import { Environment } from './environment.model';

export const environment: Environment = {
  production: true,
  apiUrl: '${API_URL}',
  firebaseConfig: {
    apiKey: '${FIREBASE_API_KEY}',
    authDomain: '${FIREBASE_AUTH_DOMAIN}',
    projectId: '${FIREBASE_PROJECT_ID}',
    appId: '${FIREBASE_APP_ID}',
    databaseURL: '${FIREBASE_DATABASE_URL}',
    storageBucket: '${FIREBASE_STORAGE_BUCKET}',
    messagingSenderId: '${FIREBASE_MESSAGING_SENDER_ID}',
    measurementId: '${FIREBASE_MEASUREMENT_ID}',
  }
};