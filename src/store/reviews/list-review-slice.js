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
        },
        updateData(state, action) {
            state.itemsList = state.itemsList.map(item =>
                item.id === action.payload.id
                    ? { ...item, state: action.payload.value === 'A' ? 'S' : 'A' }
                    : item);
        },
    },
});

export const listReviewActions = listReviewSlice.actions;

export default listReviewSlice;
