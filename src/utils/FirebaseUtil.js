import firebase from "firebase";
import { firebaseConfig } from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);
const firebaseDb = firebase.database();
export const firebaseDbRef = ref => firebaseDb.ref(ref);
export const firebaseAuth = firebase.auth();
