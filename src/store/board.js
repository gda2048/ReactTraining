import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'board',
    initialState: {
        p1: [],
        p2: [],
        isFinished: false,

    },
    reducers: {
        fill: (state, {payload: data}) => ({...state, ...data}),
        emptyBoard: (state, actions) => ({p1: [], p2: [], isFinished: false})
    }
})

export const {fill, emptyBoard} = slice.actions;
export const selectIsFinished = state => state.board.isFinished;
export const selectP1 = state => state.board.p1;
export const selectP2 = state => state.board.p2;
export default slice.reducer;