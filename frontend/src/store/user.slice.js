import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    userRelatedItems : [],
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
        setUserRelatedItems: (state, action) => {
            state.userRelatedItems = action.payload;
        },
        clearUser: (state) => {
            state.userData = null;
            state.userRelatedItems = [];
        }
    }
});

export const { setUser, setUserRelatedItems, clearUser } = userSlice.actions;
export default userSlice.reducer;