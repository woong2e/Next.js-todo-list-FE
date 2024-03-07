import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from ".";

export interface ITodoAddEnableState {
    typing: boolean;
};

export const initialState: ITodoAddEnableState = {
    typing: false,
};

export const addEnableSlice = createSlice({
    name: "typing",
    initialState,
    reducers: {
        setTyping: (state, action: PayloadAction<boolean>) => {
            console.log(action.payload);
            state.typing = action.payload ? true : false;
        },
    },
}); 

export const { setTyping } = addEnableSlice.actions; 
export default addEnableSlice.reducer;
