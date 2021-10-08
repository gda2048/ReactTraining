import {configureStore} from "@reduxjs/toolkit";
import boardReducer from './board'
import pokemonsReducer from "./pokemons";
import userReducer from "./user";

export default configureStore({
    reducer: {
        board: boardReducer,
        pokemons: pokemonsReducer,
        user: userReducer
    }
})