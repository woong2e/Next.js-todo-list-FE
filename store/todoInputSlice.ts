import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TodoInputState {
    todoInput: string;
}

export const initialState: TodoInputState = {
    todoInput: "",
};

export const todoInputSlice = createSlice({
    name: "todoInput",
    initialState,
    reducers: {
        setTodoInput: (state, action: PayloadAction<string>) => {
            state.todoInput = action.payload;
        },
    },
}); 

export const { setTodoInput } = todoInputSlice.actions; 
export default todoInputSlice.reducer;
