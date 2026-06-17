import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqRvXmDjKRo5kye39hGeh0uW0tGoi5o7c",
  authDomain: "panini-2026-c3ae8.firebaseapp.com",
  projectId: "panini-2026-c3ae8",
  storageBucket: "panini-2026-c3ae8.firebasestorage.app",
  messagingSenderId: "713513106611",
  appId: "1:713513106611:web:0f222abee8dde76915c4c6",
  measurementId: "G-X3LTQMHJZQ"
};

let app, db;
try {
  if (firebaseConfig.apiKey && firebaseConfig.projectId) {
    app = initializeApp(firebaseConfig, 'germany2006');
    db = getFirestore(app);
  } else {
    console.warn('Firebase config incomplete — using localStorage only.');
    db = null;
  }
} catch (e) {
  console.error('Firebase init error:', e);
  db = null;
}

export { db, doc, getDoc, setDoc };
