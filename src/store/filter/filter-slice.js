import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        search: '',
        fron: '',
        to: '',
        duration: '',
        topic: '',
        status: ''
    },
    reducers: {
        replaceDataSearch(state, action) {
            state.search = action.payload
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
        replaceDataStatus(state, action) {
            state.status = action.payload
        },
        clearAllData(state, action) {
            state.fron =  ''
            state.to =  ''
            state.duration =  ''
            state.topic =  ''
            state.status =  ''
        }
    },
});

export const filterActions = filterSlice.actions;

export default filterSlice;
