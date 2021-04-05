import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC1yCzyIdwEDTha8YPLDqyTMxKPzIy0lrE",
  databaseURL: "https://pirates-31599-default-rtdb.firebaseio.com",
  projectId: "pirates-31599",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;

// https://stackoverflow.com/questions/43331011/firebase-app-named-default-already-exists-app-duplicate-app
// https://developers.redhat.com/blog/2021/03/04/making-environment-variables-accessible-in-front-end-containers/
