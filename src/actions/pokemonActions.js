import axios from "axios";
import {
  POKEMON_LIST, 
  POKEMON_DETAIL, 
  POKEMON_FETCHING,
  POKEMON_ERROR, 
} from "../constans";

export const isFetching = (payload) => ({
  type: POKEMON_FETCHING,
  payload: payload,
});

export const onSuccess = (res, type) => ({
  type: type,
  payload: res,
});

export const onError = (err) => {
  // Transform the error into a serializable format
  const serializableError = {
    message: err.message,
    status: err.response?.status,
    data: err.response?.data,
  };
  return {
    type: POKEMON_ERROR,
    payload: serializableError,
  };
};

const buildQueryString = (queryParams) => {
  return Object.keys(queryParams)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
    .join('&');
};

export const getPokemonList = (page = 1, per_page=8, is_rename = false) => {
  const queryParams = {
    page,
    per_page,
    is_rename, 
  };
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axios
      .get(`/api/pokemons?${buildQueryString(queryParams)}`, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      })
      .then((res) => {
        dispatch(onSuccess(res.data, POKEMON_LIST));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};


export const getPokemonDetail = (id) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "fetch", status: true }));
    axios
      .get(`/api/pokemons/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      })
      .then((res) => {
        dispatch(onSuccess(res.data, POKEMON_DETAIL));
        dispatch(isFetching({ type: "fetch", status: false }));
      })
      .catch((err) => {
        dispatch(isFetching({ type: "fetch", status: false }));
      });
  };
};

export const catchPokemon = (id) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "submit", status: true }));
    axios
      .put(`/api/pokemons/catch/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      })
      .then((res) => {
        dispatch(onSuccess(res.data, POKEMON_DETAIL));
        dispatch(isFetching({ type: "submit", status: false }));
      })
      .catch((err) => {
        dispatch(onError(err));
        dispatch(isFetching({ type: "submit", status: false }));
      });
  };
};

export const releasePokemon = (id) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "submit", status: true }));
    axios
      .put(`/api/pokemons/release/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      })
      .then((res) => {
        dispatch(onSuccess(res.data, POKEMON_DETAIL));
        dispatch(isFetching({ type: "submit", status: false }));
      })
      .catch((err) => {
        dispatch(onError(err));
        dispatch(isFetching({ type: "submit", status: false }));
      });
  };
};

export const renamePokemon = (id) => {
  return (dispatch) => {
    dispatch(isFetching({ type: "submit", status: true }));
    axios
      .put(`/api/pokemons/rename/${id}`, {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
        },
      })
      .then((res) => {
        dispatch(onSuccess(res.data, POKEMON_DETAIL));
        dispatch(isFetching({ type: "submit", status: false }));
      })
      .catch((err) => {
        dispatch(onError(err));
        dispatch(isFetching({ type: "submit", status: false }));
      });
  };
};


