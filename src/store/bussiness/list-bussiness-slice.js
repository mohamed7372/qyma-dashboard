import { createSlice } from '@reduxjs/toolkit';

const listBussinessSlice = createSlice({
    name: 'listBussiness',
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

export const listBussinessActions = listBussinessSlice.actions;

export default listBussinessSlice;
