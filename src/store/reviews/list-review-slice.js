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
        }
    },
});

export const listReviewActions = listReviewSlice.actions;

export default listReviewSlice;
