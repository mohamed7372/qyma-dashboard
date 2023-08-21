import { createSlice } from '@reduxjs/toolkit';

const listReviewSlice = createSlice({
    name: 'listReview',
    initialState: {
        itemsList: [],
        status: null
    },
    reducers: {
        replaceData(state, action) {
            state.itemsList = action.payload;
        },
        dataLoading(state, action) {
            state.status = 'loading';
        },
        removeData(state, action) {
            state.itemsList = state.itemsList.filter(item => item.id !== action.payload);
        }
    },
});

export const listReviewActions = listReviewSlice.actions;

export default listReviewSlice;
