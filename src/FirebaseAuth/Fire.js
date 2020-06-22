// import firebase from "firebase";
// const firebaseConfig = {
//   apiKey: "AIzaSyBfmOdZOwXkiNfMV23qG124IXGwG85GHrg",
//   authDomain: "imdb-app-f7a64.firebaseapp.com",
//   databaseURL: "https://imdb-app-f7a64.firebaseio.com",
//   projectId: "imdb-app-f7a64",
//   storageBucket: "imdb-app-f7a64.appspot.com",
//   messagingSenderId: "590269783832",
//   appId: "1:590269783832:web:15b1529388f5dcf335486d",
//   measurementId: "G-1RX9V2BYJF",
// };
// const fire = firebase.initializeApp(firebaseConfig);
// export default fire;
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfmOdZOwXkiNfMV23qG124IXGwG85GHrg",
  authDomain: "imdb-app-f7a64.firebaseapp.com",
  databaseURL: "https://imdb-app-f7a64.firebaseio.com",
  projectId: "imdb-app-f7a64",
  storageBucket: "imdb-app-f7a64.appspot.com",
  messagingSenderId: "590269783832",
  appId: "1:590269783832:web:15b1529388f5dcf335486d",
  measurementId: "G-1RX9V2BYJF",
};
// const fire = firebase.initializeApp(firebaseConfig);

class fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
}
export default fire;
