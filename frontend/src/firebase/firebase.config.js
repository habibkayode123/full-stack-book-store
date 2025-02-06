// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_Auth_Domain,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDERID,
//   appId: import.meta.env.VITE_APPID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth =  getAuth(app);

// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCxDBb1mdgF3h2sBQIRHyiLR_yxgVKLGg4",
	authDomain: "tutor-24d1c.firebaseapp.com",
	databaseURL: "https://tutor-24d1c.firebaseio.com",
	projectId: "tutor-24d1c",
	storageBucket: "tutor-24d1c.firebasestorage.app",
	messagingSenderId: "871032439224",
	appId: "1:871032439224:web:1139634f8235bf57c54f4d",
	measurementId: "G-TMZL2796RQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
