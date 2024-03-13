import { configureStore } from '@reduxjs/toolkit'
import addEnableReducer  from './buttonClickEnableSlice'
import todoInputReducer from './todoInputSlice'
import loadingReducer from './loadingSlice'
import  setModalReducer  from './modalSlice'

export const store = configureStore({
  reducer: {
    isTyping: addEnableReducer,
    todoInput: todoInputReducer,
    isLoading: loadingReducer,
    modalState: setModalReducer,
  }, 
  
},)

export default store;