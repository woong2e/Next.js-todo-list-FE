import { configureStore } from '@reduxjs/toolkit'
import addEnableReducer  from './addEnableSlice'
import newTodoInputReducer from './newTodoInputSlice'
import loadingReducer from './loadingSlice'
import  setModalState  from './modalSlice'

export const store = configureStore({
  reducer: {
    isTyping: addEnableReducer,
    newTodoInput: newTodoInputReducer,
    isLoading: loadingReducer,
    modalState: setModalState,
  }, 
  
},)

export default store;