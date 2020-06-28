import firebase from "firebase";
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
const firebaseStore = firebase.initializeApp(firebaseConfig);
export default firebaseStore;
