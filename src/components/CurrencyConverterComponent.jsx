import axios from 'axios';
import React, { useEffect, useState } from 'react';


const CurrencyConverterComponent = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    // Fetch currencies from the backend
    axios.get('http://localhost:3500/api/v1/currency/get')
      .then(response => {
        setCurrencies(response.data);
      })
      .catch(error => console.error('Error fetching currencies:', error));
  }, []);

  const handleConvert = () => {
    // Make conversion request to the backend
    axios.get(`http://localhost:3500/api/v1/currency/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
      .then(response => {
        setResult(`${amount} ${fromCurrency} = ${response.data.convertedAmount.toFixed(2)} ${toCurrency}`);
      })
      .catch(error => console.error('Error converting currency:', error));
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <label htmlFor="amount">Enter Amount:</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
      </div>
      <div>
        <label htmlFor="fromCurrency">From:</label>
        <select id="fromCurrency" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          <option value="">Select currency...</option>
          {currencies.map((currency, index) => (
            <option key={`${currency.code}-${index}`} value={currency.code}>{currency.code}</option>
          ))}
        </select>

      </div>
      <div>
        <label htmlFor="toCurrency">To:</label>
        <select id="toCurrency" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          <option value="">Select currency...</option>
          {currencies.map((currency, index) => (
            <option key={`${currency.code}-${index}`} value={currency.code}>{currency.code}</option>
          ))}
        </select>

      </div>
      <button onClick={handleConvert}>Convert</button>
      <div>{result}</div>
    </div>
  );
};

export default CurrencyConverterComponent;
