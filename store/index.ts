import { configureStore } from '@reduxjs/toolkit'
import { addTodoSlice } from './addTodoSlice'
import { newTodoInputSlice } from './newTodoInputSlice'

export const store = configureStore({
  reducer: {
    isTyping: addTodoSlice.reducer, 
    newTodoInput: newTodoInputSlice.reducer,
  }, 
  
},)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;