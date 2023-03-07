import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDm4NZEPE0m8fWpNTvPH94rZb0ojKxo1NE",
  authDomain: "celestial-brand-379901.firebaseapp.com",
  projectId: "celestial-brand-379901",
  storageBucket: "celestial-brand-379901.appspot.com",
  messagingSenderId: "580485484984",
  appId: "1:580485484984:web:c234a4b0545ea3815cbf4d",
  measurementId: "G-RJB0BVR90C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
