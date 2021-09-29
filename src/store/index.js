import {configureStore} from "@reduxjs/toolkit";
import boardReducer from './board'
import pokemonsReducer from "./pokemons";

export default configureStore({
    reducer: {
        board: boardReducer,
        pokemons: pokemonsReducer
    }
})