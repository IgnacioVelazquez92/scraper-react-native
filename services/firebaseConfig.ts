import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAJj98vg7wF9P0iUeKW-qjGKhqFP4TWK8A",
  authDomain: "app-barcode-f4b99.firebaseapp.com",
  projectId: "app-barcode-f4b99",
  storageBucket: "app-barcode-f4b99.appspot.com",
  messagingSenderId: "361582845126",
  appId: "1:361582845126:web:15767ab4d639824cc64bc7",
  measurementId: "G-K343BN8Y37"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
