import firebase from 'firebase';
import { firebaseConfig } from '../config/firebaseConfig';

firebase.initializeApp(firebaseConfig);
export const firebaseDbRef = ref => firebase.database().ref(ref);
export const firebaseAuth = firebase.auth();
