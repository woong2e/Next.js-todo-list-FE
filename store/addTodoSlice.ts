import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ITodoAddEnableState {
    typing: boolean;
};

const initialState: ITodoAddEnableState = {
    typing: false
};

export const addTodoSlice = createSlice({
    name: "isTyping",
    initialState,
    reducers: {
        setIsTyping: (state, action: PayloadAction<boolean>) => {
            state.typing = action.payload ? false : true;
        },
    },
}); 

export const { setIsTyping } = addTodoSlice.actions; 
export default addTodoSlice.reducer;
