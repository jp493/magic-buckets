
// // import * as firebase from 'firebase';
//   // Initialize Firebase
// const config = {
//   apiKey: "AIzaSyA5D9l9Ui2mvQ7D1u1w421Qpg_9ebw5QjI",
//   authDomain: "magicbuckets-jp493.firebaseapp.com",
//   databaseURL: "https://magicbuckets-jp493.firebaseio.com",
//   projectId: "magicbuckets-jp493",
//   storageBucket: "magicbuckets-jp493.appspot.com",
//   messagingSenderId: "240603438205"
// };
//
// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }
//
// // module.exports = {
// //
// //   loggedIn() {
// //     return new Promise(function(resolve, reject) {
// //       firebase.auth().onAuthStateChanged((user) => {
// //         resolve(!!user);
// //       });
// //     });
// //   },
// //
// //   createUser(e) {
// //     e.preventDefault();
// //     const email = this.createEmail.value;
// //     const password = this.createPassword.value;
// //
// //     firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
// //       const errorCode = error.code;
// //       const errorMessage = error.message;
// //       alert(`Error Code: ${errorCode}. Message: ${errorMessage}`);
// //     });
// //   },
// //
// //   loginUser(e, success) {
// //     e.preventDefault();
// //     const email = this.loginEmail.value;
// //     const password = this.loginPassword.value;
// //
// //     firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
// //       const errorCode = error.code;
// //       const errorMessage = error.message;
// //       alert(`Error Code: ${errorCode}. Message: ${errorMessage}`);
// //     });
// //   },
// //
// //
// //   signOutUser(e) {
// //     // e.preventDefault();
// //     firebase.auth().signOut().then(function() {
// //       alert('User signed out.');
// //
// //     }, function(error) {
// //       const errorCode = error.code;
// //       const errorMessage = error.message;
// //       alert(`Error Code: ${errorCode}. Message: ${errorMessage}`);
// //     });
// //   }
//
// const auth = firebase.auth();
//
// export {
//   auth,
// };
