const initialState = {
  loading: false,
  user: {},
  pokemonUser: [],
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_POKEMON_USER':
      return {
        ...state,
        pokemon: action.payload,
      };
    default:
      return state;
  }
};
