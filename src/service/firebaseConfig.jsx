// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCUENXbKmWFx7ZQ8NeftIrRHkFfT5JX_qI",
	authDomain: "aitrip-3f4d3.firebaseapp.com",
	projectId: "aitrip-3f4d3",
	storageBucket: "aitrip-3f4d3.appspot.com",
	messagingSenderId: "360483585835",
	appId: "1:360483585835:web:79d222a1cc0b096af14f6e",
	measurementId: "G-QLXDMZ39MB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
