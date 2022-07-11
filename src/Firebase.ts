import firebase from "firebase/app";
import "firebase/firestore";



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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const database = firebase.firestore();


