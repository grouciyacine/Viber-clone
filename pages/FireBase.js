import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBI4bpdW4z6R4S3DpWBiBgmm6AkxVf3uB8",
  authDomain: "viber-clone-3820e.firebaseapp.com",
  projectId: "viber-clone-3820e",
  storageBucket: "viber-clone-3820e.appspot.com",
  messagingSenderId: "197665996786",
  appId: "1:197665996786:web:2ff3121d375556853b756b",
  measurementId: "G-7G199SY40K"
};

export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db=getFirestore()
export default db;