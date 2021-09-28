import React, { useState, useEffect } from "react";

export default function Ticker() {
  const [stocks, setStocks] = useState([]);
  const apiKey = "bqrZxpYkw4h0AygR9ctu3oqS3YWvgk5O";

  // use async/await to fetch data from
  useEffect(() => {
    getData();

    async function getData() {
      const res = await fetch(
        `https://api.polygon.io/v3/reference/tickers?market=stocks&active=true&sort=ticker&order=asc&limit=10&apiKey=${apiKey}`
      );
      const data = await res.json();
      // store data into variables
      setStocks(data.results);
    }
  }, []);

  if (!stocks) {
    return null;
  }
  
  return (
    <div>
      <h1>STOCKS</h1>
      {/* display data from API */}
      {stocks && (
        <div className="stocks">
          {/* loop over the stocks */}
          {stocks.map((stock, index) => (
            <div key={index}>
              <h4>Stock Name: {stock.name}</h4>
              <h4>Stock Currency Type: {stock.currency_name}</h4>
              <h4>CIK: {stock.cik}</h4>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
