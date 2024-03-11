import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TodoAddEnableState {
    isTyping: boolean;
};

export const initialState: TodoAddEnableState = {
    isTyping: false,
};

export const addEnableSlice = createSlice({
    name: 'isTyping',
    initialState,
    reducers: {
        setIsTyping: (state, action: PayloadAction<boolean>) => {
            console.log(action.payload);
            state.isTyping = action.payload ? true : false;
        },
    },
}); 

export const { setIsTyping } = addEnableSlice.actions; 
export default addEnableSlice.reducer;
