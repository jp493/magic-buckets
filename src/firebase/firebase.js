
import * as firebase from 'firebase';
  // Initialize Firebase
const config = {
  apiKey: "AIzaSyA5D9l9Ui2mvQ7D1u1w421Qpg_9ebw5QjI",
  authDomain: "magicbuckets-jp493.firebaseapp.com",
  databaseURL: "https://magicbuckets-jp493.firebaseio.com",
  projectId: "magicbuckets-jp493",
  storageBucket: "magicbuckets-jp493.appspot.com",
  messagingSenderId: "240603438205"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
