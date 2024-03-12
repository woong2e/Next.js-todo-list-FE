import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo, CustomModalType } from "@/types";

export interface ModalState {
    focusedTodo: Todo | null,
    madalType: CustomModalType,
};

export const initialState: ModalState = {
    focusedTodo: null,
    madalType: 'detail',    
};

export const modalSlice = createSlice({
    name: 'modalState',
    initialState,
    reducers: {
        setModalState: (state, action: PayloadAction<ModalState>) => {
            state.focusedTodo = action.payload.focusedTodo;
            state.madalType = action.payload.madalType;
        },
    },
}); 

export const { setModalState } = modalSlice.actions; 
export default modalSlice.reducer;
