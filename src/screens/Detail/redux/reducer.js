const initialState = {
  pokemon: {},
};

export const detailPokemonReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DETAIL_POKEMON':
      return {
        ...state,
        detailPokemon: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
