import firebase from "firebase"
  require ("@firebase/firestore")
  var firebaseConfig = {
    apiKey: "AIzaSyAh_u4oUDq6jbqMgd7ujx8y-TvzUMPiEAI",
    authDomain: "type-o-facebook.firebaseapp.com",
    projectId: "type-o-facebook",
    storageBucket: "type-o-facebook.appspot.com",
    messagingSenderId: "920122398099",
    appId: "1:920122398099:web:1e680e5579834039e50466",
    measurementId: "G-THJ3RXFZRR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
  export  default firebase.firestore()