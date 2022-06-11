import axios from 'axios';

export const getPokemon = endpoint => async dispatch => {
  //   axios.defaults.headers.Authorization = `Bearer ${token}`;
  try {
    // dispatch(setLoading(true));
    const result = await axios.get(`${endpoint}`);
    console.log(result.data.results);
    dispatch(setPokemon(result.data));
  } catch (err) {
    console.log(err);
  } finally {
    // dispatch(setLoading(false));
  }
};

export const setPokemon = payload => {
  return {
    type: 'SET_POKEMON',
    payload: payload,
  };
};
