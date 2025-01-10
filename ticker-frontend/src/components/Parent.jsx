import React, { useState } from 'react';
import Child from './Child';

const Parent = () => {
  const [ticker, setTicker] = useState('');

  const handleSearch = () => {
    setTicker(document.getElementById('tickerInput').value);
  };

  return (
    <div>
      <h1>Ticker Search</h1>
      <input id="tickerInput" type="text" placeholder="Enter ticker (e.g., AAPL)" />
      <button onClick={handleSearch}>Search</button>
      <Child ticker={ticker} />
    </div>
  );
};

export default Parent;
