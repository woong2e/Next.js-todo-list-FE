import { configureStore } from '@reduxjs/toolkit'
import addEnableReducer  from './addEnableSlice'
import ewTodoInputReducer from './newTodoInputSlice'

export const store = configureStore({
  reducer: {
    isTyping: addEnableReducer,
    newTodoInput: ewTodoInputReducer,
  }, 
  
},)

export default store;