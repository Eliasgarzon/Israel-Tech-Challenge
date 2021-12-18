import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVDeHyDPZexStP2s4orI-4VrKsCmP7vt8",
  authDomain: "chirper-33289.firebaseapp.com",
  projectId: "chirper-33289",
  storageBucket: "chirper-33289.appspot.com",
  messagingSenderId: "435210229256",
  appId: "1:435210229256:web:e70d8d376104c37843e3bd",
};

const firebaseApp = initializeApp(firebaseConfig);

const projectDb = getFirestore();
const projectAuth = getAuth();
const projectStorage = getStorage(firebaseApp);

export { projectDb, projectAuth, projectStorage };
