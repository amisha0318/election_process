import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Save chat history
export async function saveChatSession(userId, messages) {
  try {
    await addDoc(collection(db, 'chatSessions'), {
      userId,
      messages,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error saving chat session:', error);
  }
}

// Get user's saved locations
export async function getSavedLocations(userId) {
  try {
    const q = query(collection(db, 'savedLocations'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting saved locations:', error);
    return [];
  }
}

// Save a location
export async function saveLocation(userId, location) {
  try {
    await addDoc(collection(db, 'savedLocations'), {
      userId,
      ...location,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error saving location:', error);
  }
}
