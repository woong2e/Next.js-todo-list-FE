import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface buttonClickeEnableState {
    isTyping: boolean;
};

export const initialState: buttonClickeEnableState = {
    isTyping: false,
};

export const buttonClickEnableSlice = createSlice({
    name: 'isTyping',
    initialState,
    reducers: {
        setIsTyping: (state, action: PayloadAction<boolean>) => {
            state.isTyping = action.payload ? true : false;
        },
    },
}); 

export const { setIsTyping } = buttonClickEnableSlice.actions; 
export default buttonClickEnableSlice.reducer;
