import { configureStore } from '@reduxjs/toolkit'
import addEnableReducer  from './buttonClickEnableSlice'
import todoInputReducer from './todoInputSlice'
import loadingReducer from './loadingSlice'
import  setModalReducer  from './modalSlice'
import  setEditInput  from './editInputSlice'

export const store = configureStore({
  reducer: {
    isTyping: addEnableReducer,
    todoInput: todoInputReducer,
    isLoading: loadingReducer,
    modalState: setModalReducer,
    editInput: setEditInput,
  }, 
  
},)

export default store;