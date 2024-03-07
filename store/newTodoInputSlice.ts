import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface INewTodoInputState {
    newTodoInput: string;
}

export const initialState: INewTodoInputState = {
    newTodoInput: "",
};

export const newTodoInputSlice = createSlice({
    name: "newTodoInput",
    initialState,
    reducers: {
        setNewTodoInput: (state, action: PayloadAction<string>) => {
            state.newTodoInput = action.payload;
            // return state;
        },
    },
}); 

export const { setNewTodoInput } = newTodoInputSlice.actions; 
export default newTodoInputSlice.reducer;
