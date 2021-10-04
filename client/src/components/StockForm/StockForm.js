import React, { useState, useRef } from 'react';

/*
{
    "ticker": "AAPL",
    "queryCount": 1,
    "resultsCount": 1,
    "adjusted": true,
    "results": [
     {
      "T": "AAPL",
      "v": 94606681,
      "vw": 141.1056,
      "o": 141.9,
      "c": 142.65,
      "h": 142.92,
      "l": 139.1101,
      "t": 1633118400000,
      "n": 730084
     }]}
    */




function Stockform() {
    const data = {
        "ticker": "AAPL",
        "queryCount": 1,
        "resultsCount": 1,
        "adjusted": true,
        "results": [
         {
          "T": "AAPL",
          "v": 94606681,
          "vw": 141.1056,
          "o": 141.9,
          "c": 142.65,
          "h": 142.92,
          "l": 139.1101,
          "t": 1633118400000,
          "n": 730084
         }]}

    const inputRef = useRef();

    const [ticker, setTicker] = useState('test');
    const [stock, setStock] = useState({});

    const handleSearch = (event, data) => {
        event.preventDefault()
        setStock({...stock, ticker: data.ticker, price: data.results[0].c});
        inputRef.current.value = ''
    };


    return (
        <>
            <div className="row ">
                <form className="col s12" id="stock-form">

                    <div className="row z-depth-3 border-radius col l6 offset-l3 m8 offset-m2 s10 offset-s1 test text">

                        <div className="row">
                            <div className="center-align">
                                <h4 className="text">Stock search</h4>
                            </div>
                        </div>

                        <div className="row ">
                            <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                                <input placeholder="ticker" id="ticker" type="text" ref={inputRef}></input>
                                <label for="ticker"></label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="center-align">
                                <button className="waves-effect waves-light btn" type="submit" name="action" onClick={(event) => handleSearch(event, data)}>Search</button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="center-align">{ticker}</div>
                        </div>
                    </div>

                </form>

            </div>

        </>
    );
}

export default Stockform;