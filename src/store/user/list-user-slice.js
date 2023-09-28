import { createSlice } from '@reduxjs/toolkit';

const listUserSlice = createSlice({
    name: 'listUser',
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

export const listUserActions = listUserSlice.actions;

export default listUserSlice;
