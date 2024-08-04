import {
  POKEMON_FETCHING,
  POKEMON_LIST,
  POKEMON_DETAIL,
  POKEMON_ERROR
} from "../constans"

const initialState = {
  currentPage: 1,
  totalPages: 0,
  isFetching: false,
  isSubmiting: false,
  data: [],
  details: null,
  error: null
};

const onFetching = (lastState,payload) => {
  if(payload.type==='fetch')
    return { ...lastState, isFetching:payload.status}
  if(payload.type==='submit')
    return { ...lastState, isSubmiting:payload.status}
  return { ...lastState, isFetching:false, isSubmiting:false}
}

const pokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case POKEMON_FETCHING: return onFetching(state, action.payload)
    case POKEMON_LIST:{
      const { data, pagination }=action.payload;
      return {
        ...state, data: [...state.data, ...data], currentPage: pagination.page, totalPages: pagination.total_pages, isFetching:false, error:null
      }
    }
    case POKEMON_DETAIL:{
      const { data }=action.payload;
      return {
        ...state, details:data, isFetching:false, error:null
      }
    }
    case POKEMON_ERROR:{
      const { payload }=action;
      return {
        ...state, error:{...payload}
      }
    }
    default:
      return state;
  }
};
export default pokemonReducer;