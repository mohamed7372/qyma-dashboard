import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './filter/filter-slice';
import listCategorySlice from './category/list-category-slice';
import categorySlice from './category/category-slice';
import bussinessSlice from './bussiness/bussiness-slice';
import listBussinessSlice from './bussiness/list-bussiness-slice';
import reviewSlice from './reviews/review-slice';
import listReviewSlice from './reviews/list-review-slice';
import listUserSlice from './user/list-user-slice';
import userSlice from './user/user-slice';

const store = configureStore({
  reducer: {
    bussiness: bussinessSlice.reducer,
    listBussiness: listBussinessSlice.reducer,

    listCategory: listCategorySlice.reducer,
    category: categorySlice.reducer,
    
    listReview: listReviewSlice.reducer,
    review: reviewSlice.reducer,
    
    listUser: listUserSlice.reducer,
    user: userSlice.reducer,

    filter: filterSlice.reducer
  },
});

export default store;
