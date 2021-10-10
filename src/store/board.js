import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'board',
    initialState: {
        p1: [],
        p2: [],
        isFinished: false,

    },
    reducers: {
        setPlayer1: (state, {payload: data}) => ({...state, p1: data}),
        setPlayer2: (state, {payload: data}) => ({...state, p2: data}),
        fill: (state, {payload: data}) => ({...state, ...data}),
        emptyBoard: (state, actions) => ({p1: [], p2: [], isFinished: false})
    }
})

export const {setPlayer1, setPlayer2, fill, emptyBoard} = slice.actions;
export const selectIsFinished = state => state.board.isFinished;
export const selectPlayer1 = state => state.board.p1;
export const selectPlayer2 = state => state.board.p2;
export default slice.reducer;