import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
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

export const userActions = userSlice.actions;

export default userSlice;
