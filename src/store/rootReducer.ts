import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../services/authSlice'; // Certifique-se de que este caminho está correto

const rootReducer = combineReducers({
  auth: authReducer,
  // Adicione outros reducers aqui
});

export default rootReducer;