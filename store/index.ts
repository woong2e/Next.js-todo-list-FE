import { configureStore } from '@reduxjs/toolkit'
import { addEnableSlice } from './addEnableSlice'
import { newTodoInputSlice } from './newTodoInputSlice'

export const store = configureStore({
  reducer: {
    isTyping: addEnableSlice.reducer, 
    newTodoInput: newTodoInputSlice.reducer,
  }, 
  
},)

export default store;