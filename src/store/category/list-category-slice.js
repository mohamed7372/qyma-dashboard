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
        },
        removeData(state, action) {
            state.itemsList = state.itemsList.filter(item => item.id !== action.payload);
        },
        updateData(state, action) {
            state.itemsList = state.itemsList.map(item =>
                item.id === action.payload.id
                    ? { ...item, status: !action.payload.value }
                    : item);
        },
    },
});

export const listCategoryActions = listCategorySlice.actions;

export default listCategorySlice;
