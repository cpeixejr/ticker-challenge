import React, { useState } from 'react';
import Child from './Child';
import './Parent.css'; // Adicione a importação do CSS

const Parent = () => {
  const [ticker, setTicker] = useState('');

  const handleSearch = () => {
    setTicker(document.getElementById('tickerInput').value);
  };

  return (
    <div>
      <h1>Ticker Search</h1>
      <div className="search-container"> {/* Container para o input e botão */}
        <input
          id="tickerInput"
          type="text"
          placeholder="Enter ticker (e.g., AAPL)"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          <i className="fa fa-search"></i> {/* Ícone de lupa */}
        </button>
      </div>
      <Child ticker={ticker} />
    </div>
  );
};

export default Parent;
