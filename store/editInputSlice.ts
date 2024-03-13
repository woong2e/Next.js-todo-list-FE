import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface EditInputState {
    editInput: string;
}

export const initialState: EditInputState = {
    editInput: "",
};

export const editInputSlice = createSlice({
    name: "editInput",
    initialState,
    reducers: {
        setEditInput: (state, action: PayloadAction<string>) => {
            state.editInput = action.payload;
        },
    },
}); 

export const { setEditInput } = editInputSlice.actions; 
export default editInputSlice.reducer;
