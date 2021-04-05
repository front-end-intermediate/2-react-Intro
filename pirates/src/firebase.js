import firebase from "firebase/app";
import "firebase/database";

import Config from "./config.json";

const firebaseConfig = {
  apiKey: Config.API_KEY,
  databaseURL: Config.DATABASE_URL,
  projectId: Config.PROJECT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;

// https://stackoverflow.com/questions/43331011/firebase-app-named-default-already-exists-app-duplicate-app
// https://developers.redhat.com/blog/2021/03/04/making-environment-variables-accessible-in-front-end-containers/
