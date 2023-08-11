import { createSlice } from '@reduxjs/toolkit';

const bussinessSlice = createSlice({
    name: 'bussiness',
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

export const bussinessActions = bussinessSlice.actions;

export default bussinessSlice;
