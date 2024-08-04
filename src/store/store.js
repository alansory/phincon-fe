import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../reducers/pokemonReducers';

const store = configureStore({
  reducer: {
    pokemons: pokemonReducer, 
  },
});

export default store;
