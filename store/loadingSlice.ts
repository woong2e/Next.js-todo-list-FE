import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoadingState {
    isLoaging: boolean;
}

export const initialState: LoadingState = {
    isLoaging: false,
};

export const loadingSlice = createSlice({
    name: "isLoaging",
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            console.log(action.payload);
            state.isLoaging = action.payload ? true : false;
        },
    },
}); 

export const { setIsLoading } = loadingSlice.actions; 
export default loadingSlice.reducer;
