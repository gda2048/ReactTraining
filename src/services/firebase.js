import firebase from 'firebase/compat/app';
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyDqdkgenjUR8ch9nA3ceshvxYaxB3ZdWmg",
  authDomain: "pokemon-game-599b0.firebaseapp.com",
  databaseURL: "https://pokemon-game-599b0-default-rtdb.firebaseio.com",
  projectId: "pokemon-game-599b0",
  storageBucket: "pokemon-game-599b0.appspot.com",
  messagingSenderId: "882603497944",
  appId: "1:882603497944:web:e1e4b9f0da1f060fdb7aad"
};

const fire = firebase.initializeApp(firebaseConfig);
const database = fire.database()

export default database;