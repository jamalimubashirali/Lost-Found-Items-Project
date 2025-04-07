import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userRelatedItems : [],
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUserRelatedItems: (state, action) => {
            state.userRelatedItems = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
            state.userRelatedItems = [];
        }
    }
});

export const { setUser, setUserRelatedItems, clearUser } = userSlice.actions;
export default userSlice.reducer;