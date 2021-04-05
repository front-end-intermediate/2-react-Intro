import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC1yCzyIdwEDTha8YPLDqyTMxKPzIy0lrE",
  authDomain: "pirates-31599.firebaseapp.com",
  databaseURL: "https://pirates-31599-default-rtdb.firebaseio.com",
  projectId: "pirates-31599",
  storageBucket: "pirates-31599.appspot.com",
  messagingSenderId: "79434369957",
  appId: "1:79434369957:web:79f3f3b74964f5eb87f64c",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
