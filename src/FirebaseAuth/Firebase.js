import firebase from "firebase/app";
import "firebase/firestore";
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
class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    console.log("I CAME");
    this.db = firebase.firestore();
    this.auth = firebase.auth();
  }
  getFirestore = () => {
    console.log(this.db);
    return this.db;
  };
  getAuth = () => {
    return this.auth;
  };
}
export default Firebase;
