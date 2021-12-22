import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAU0S14Noq2xNSGLoAK7MLKsZEYbUZ8MvA",
    authDomain: "insta-clone-clever.firebaseapp.com",
    databaseURL: "https://insta-clone-clever-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "insta-clone-clever",
    storageBucket: "insta-clone-clever.appspot.com",
    messagingSenderId: "798712032072",
    appId: "1:798712032072:web:6d00f454b67baa9990a17d"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

