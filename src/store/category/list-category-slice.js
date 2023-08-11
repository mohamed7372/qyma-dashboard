import { createSlice } from '@reduxjs/toolkit';

const listCategorySlice = createSlice({
    name: 'listCategory',
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

export const listCategoryActions = listCategorySlice.actions;

export default listCategorySlice;
