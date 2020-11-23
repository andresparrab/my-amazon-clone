import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCAKPqsT5Ceq8k1X-SD_lZl3UGqMSFfru4",
  authDomain: "challange-2befc.firebaseapp.com",
  databaseURL: "https://challange-2befc.firebaseio.com",
  projectId: "challange-2befc",
  storageBucket: "challange-2befc.appspot.com",
  messagingSenderId: "761116713847",
  appId: "1:761116713847:web:640735f3fd875ec5c17772",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
