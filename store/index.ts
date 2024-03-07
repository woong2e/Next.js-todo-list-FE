import { configureStore } from '@reduxjs/toolkit'
import { addEnableSlice } from './addEnableSlice'
import { newTodoInputSlice } from './newTodoInputSlice'

export const store = configureStore({
  reducer: {
    isTyping: addEnableSlice.reducer, 
    newTodoInput: newTodoInputSlice.reducer,
  }, 
  
},)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;