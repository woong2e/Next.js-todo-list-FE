import { configureStore } from '@reduxjs/toolkit'
import addEnableReducer  from './addEnableSlice'
import newTodoInputReducer from './newTodoInputSlice'
import loadingReducer from './loadingSlice'

export const store = configureStore({
  reducer: {
    isTyping: addEnableReducer,
    newTodoInput: newTodoInputReducer,
    isLoading: loadingReducer,
  }, 
  
},)

export default store;