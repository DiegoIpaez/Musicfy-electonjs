import firebaseConfig from './firebase.config'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// const allCollections = collection(db, 'musicfy')

export { auth, db, storage };
