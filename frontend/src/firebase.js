import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

//testing the new key
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };