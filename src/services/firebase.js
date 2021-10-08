class Firebase {
  constructor() {
    this.host = "https://pokemon-game-599b0-default-rtdb.firebaseio.com"
    this.localID = null
  }

  token = () => localStorage.getItem('idToken')

  setLocalID = (localID) => {
    this.localID = localID;
  }

  getPokemons = async () => {
    if (this.localID) {
      return await fetch(`${this.host}/${this.localID}/pokemons.json?auth=${this.token()}`).then(res => res.json())
    } else {
      return []
    }
  }



  addPokemon = async (data) => {
    const res = await fetch(`${this.host}/${this.localID}/pokemons.json?auth=${this.token()}`, {
      method: 'POST',
      body: JSON.stringify(data)
    }).then(res => res.json())
    return res;
  }

}

const FirebaseClass = new Firebase()

export default FirebaseClass;