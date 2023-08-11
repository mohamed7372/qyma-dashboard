import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
    name: 'review',
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

export const reviewActions = reviewSlice.actions;

export default reviewSlice;
