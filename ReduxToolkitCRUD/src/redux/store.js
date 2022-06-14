import {configureStore} from '@reduxjs/toolkit';
import postReducer from './slices/postSlice';

export default configureStore({
  reducer: {
    app: postReducer,
  },
});
