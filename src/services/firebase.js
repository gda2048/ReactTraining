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

class Firebase {
  constructor() {
    this.fire = fire
    this.database = this.fire.database()
  }
  getPokemonsOnce = async () => {
    return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val())
  }

  getPokemonSocket = (cb) => {
    this.database.ref('pokemons').on('value', (snapshot) => {cb(snapshot.val())})
  }

  postPokemon = (key, pokemon) => {
    this.database.ref(`pokemons/${key}`).set(pokemon);
  }

  addPokemon = (data, cb) => {
    const newKey = this.database.ref().child('pokemons').push().key;
    this.database.ref('pokemons/' + newKey).set(data).then(() => cb());
  }

  offPokemonSocket = () => {
        this.database.ref('pokemons').off()
  }

}

const FirebaseClass = new Firebase()

export default FirebaseClass;