import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  'apiKey': "AIzaSyBtlZjqrSV20C3-5aS73fhSFaf1fI8YY9Y",
  'authDomain': "flask-test-a9df8.firebaseapp.com",
  'databaseURL': "https://flask-test-a9df8-default-rtdb.firebaseio.com",
  'projectId': "flask-test-a9df8",
  'storageBucket': "flask-test-a9df8.appspot.com",
  'messagingSenderId': "442349353641",
  'appId': "1:442349353641:web:112bf48c7cd058427187b8",
  'measurementId': "G-KY4CF8ER8W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
