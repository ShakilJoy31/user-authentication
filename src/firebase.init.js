import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAVnC4_TeH9mVhNIzDubO3euDqz7hpOyh0",
  authDomain: "business-site-7cabf.firebaseapp.com",
  projectId: "business-site-7cabf",
  storageBucket: "business-site-7cabf.appspot.com",
  messagingSenderId: "768167256065",
  appId: "1:768167256065:web:48f490d343a1ba01f56000",
  measurementId: "G-9X254E37VB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth; 