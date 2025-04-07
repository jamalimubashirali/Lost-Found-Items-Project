import {configureStore} from '@reduxjs/toolkit';
import  authSlice  from './auth.slice';
import userSlice from './user.slice';

const store = configureStore({
    reducer : {
        auth : authSlice,
        user : userSlice
    }
});

export default store;
