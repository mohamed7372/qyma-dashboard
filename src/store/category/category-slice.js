import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        item: null,
        status: null
    },
    reducers: {
        replaceData(state, action) {
            state.item = action.payload;
        },
        dataLoading(state, action) {
            state.status = 'loading';
        }
    },
});

export const categoryActions = categorySlice.actions;

export default categorySlice;
