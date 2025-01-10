import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicker } from '../store/actions';

const Child = ({ ticker }) => {
  const dispatch = useDispatch();
  const tickerData = useSelector((state) => state.tickerData);

  useEffect(() => {
    if (ticker) {
      dispatch(fetchTicker(ticker, '2023-01-01', '2023-12-31'));
    }
  }, [ticker, dispatch]);

  return (
    <div>
      <h2>Ticker Data</h2>
      {tickerData ? (
        <pre>{JSON.stringify(tickerData, null, 2)}</pre>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Child;
