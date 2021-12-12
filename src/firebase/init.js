// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB64na4eIOoa4Xm8svGqKkPPtxC6oL2cAo",
  authDomain: "vue-chat-zewei.firebaseapp.com",
  projectId: "vue-chat-zewei",
  storageBucket: "vue-chat-zewei.appspot.com",
  messagingSenderId: "504052051111",
  appId: "1:504052051111:web:5dbee5a4f5ac3d8f4e3f82",
  measurementId: "G-VESCYD2TSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// firebaseapp.firestore().settings({timestampsInSnapshots: true});
const db = getFirestore(app);
export default db;