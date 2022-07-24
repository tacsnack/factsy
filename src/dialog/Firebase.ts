import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAbmvFNLGp5271xDc5VsxA6OD3zyI2om10",
    authDomain: "game-56288.firebaseapp.com",
    databaseURL: "https://game-56288-default-rtdb.firebaseio.com",
    projectId: "game-56288",
    storageBucket: "game-56288.appspot.com",
    messagingSenderId: "456124264327",
    appId: "1:456124264327:web:e854b44880d05ad3c6ad22",
    measurementId: "G-YS4HSTKNTD"
};

firebase.initializeApp(firebaseConfig);
export const database = firebase.firestore();
export const auth = firebase.auth();

// Configure FirebaseUI.
export const uiConfigAuth = {
    signInFlow: 'popup',
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
    signInOptions: [
        // firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};
