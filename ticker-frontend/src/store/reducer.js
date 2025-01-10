import { FETCH_TICKER_SUCCESS } from './actions';

const initialState = {
  tickerData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKER_SUCCESS:
      console.log(action.payload)
      return { ...state, tickerData: action.payload };
    default:
      return state;
  }
};

export default reducer;
