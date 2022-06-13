export const setLoading = payload => {
  return {
    type: 'SET_LOADING',
    payload: payload,
  };
};

export const setUser = payload => {
  return {
    type: 'SET_USER',
    payload: payload,
  };
};

export const setPokemonUser = payload => {
  return {
    type: 'SET_POKEMON_USER',
    payload: payload,
  };
};
