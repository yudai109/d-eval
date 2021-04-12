import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyBp9jG4W4zU1j_B3q9eumyT3T4Ppfm_MWM",
    authDomain: "v-docomo.firebaseapp.com",
    projectId: "v-docomo",
    storageBucket: "v-docomo.appspot.com",
    messagingSenderId: "624596295231",
    appId: "1:624596295231:web:ce98cbd7090a95d232a28a"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth
export const firestore = firebase.firestore
export default firebase