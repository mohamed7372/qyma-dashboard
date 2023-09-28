import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        search: '',
        search2: '',
        fron: '',
        to: '',
        duration: '',
        topic: '',
        rating: '',
        status: '',
        typeAccount: ''
    },
    reducers: {
        replaceDataSearch(state, action) {
            state.search = action.payload
        },
        replaceDataSearch2(state, action) {
            state.search2 = action.payload
        },
        replaceDataFrom(state, action) {
            state.from = action.payload
        },
        replaceDataTo(state, action) {
            state.to = action.payload
        },
        replaceDataDuration(state, action) {
            state.duration = action.payload
        },
        replaceDataTopic(state, action) {
            state.topic = action.payload
        },
        replaceDataRating(state, action) {
            state.rating = action.payload
        },
        replaceDataStatus(state, action) {
            state.status = action.payload
        },
        replaceDataTypeAccount(state, action) {
            state.typeAccount = action.payload
        },
        clearAllData(state, action) {
            state.fron =  ''
            state.to =  ''
            state.duration =  ''
            state.topic =  ''
            state.rating =  ''
            state.status = ''
            state.typeAccount = ''
        }
    },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
