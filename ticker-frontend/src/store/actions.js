import axios from 'axios';

export const FETCH_TICKER_SUCCESS = 'FETCH_TICKER_SUCCESS';

export const fetchTicker = (ticker, startDate, endDate) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/tickers/${ticker}?start_date=${startDate}&end_date=${endDate}`
    );
    console.log(response.data)
    dispatch({ type: FETCH_TICKER_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Failed to fetch ticker data:', error);
  }
};
