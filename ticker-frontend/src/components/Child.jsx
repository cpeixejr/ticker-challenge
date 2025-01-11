import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTicker } from '../store/actions';
import './Child.css'; // Adicione a importação do CSS

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
        <table className="ticker-table"> {/* Adicionando a tabela */}
          <thead>
            <tr>
              <th>Campo</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tickerData).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Child;