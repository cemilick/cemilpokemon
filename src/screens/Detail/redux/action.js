import axios from 'axios';

export const getDetailPokemon = endpoint => async dispatch => {
  try {
    // dispatch(setLoading(true));
    const result = await axios.get(`${endpoint}`);
    console.log(result.data);
    dispatch(setDetailPokemon(result.data));
  } catch (err) {
    console.log(err);
  } finally {
    // dispatch(setLoading(false));
  }
};

export const setDetailPokemon = payload => {
  return {
    type: 'SET_DETAIL_POKEMON',
    payload: payload,
  };
};
