import {createSlice} from '@reduxjs/toolkit'
import {selectLocalId} from "./user";

export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        selectedPokemons: {},
        error: null
    },
    reducers: {
        emptyPokemons: (state, actions) =>
            ({isLoading: false, data: {}, selectedPokemons: {}, error: null}),
        selectPok: (state, {payload: {key, pokemon}}) => {
            const Pokemons = {...state.selectedPokemons}
            if (key in Pokemons){
                delete Pokemons[key]
            } else {
                Pokemons[key] = pokemon
            }
            return {...state, selectedPokemons: Pokemons}
        },
        fetchPokemons: state => ({...state, isLoading: true}),
        fetchPokemonsResolve: (state, action) => ({...state, isLoading: false, data: action.payload}),
        fetchPokemonsReject: (state, action) => ({...state, isLoading: false, data:{}, error: action.payload}),
    }
})

export const {emptyPokemons, selectPok, fetchPokemons, fetchPokemonsReject, fetchPokemonsResolve} = slice.actions;
export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;
export const selectSelectedPokemons = state => state.pokemons.selectedPokemons;

export default slice.reducer;

export const getPokemonsAsync =  () => async (dispatch, getState) => {
    const localId = selectLocalId(getState())
    dispatch(fetchPokemons());
    const data = await fetch(`https://pokemon-game-599b0-default-rtdb.firebaseio.com/${localId}/pokemons.json`).then(res => res.json())
    dispatch(fetchPokemonsResolve(data));
}