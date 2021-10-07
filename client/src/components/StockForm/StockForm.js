import React, { useState, useEffect } from 'react';
import Buyform from './Buyform'
import Portfolio from './Portfolio'
import './stockform.css'
import auth from '../../utils/auth';



function Stockform() {

    // const inputRef = useRef();
    // stock.results[0].T, stock.results[0].c, stock.results[0].c - stock.results[0].o
    // difference: rounded(data.results[0].c - data.results[0].o)

    const [ticker, setTicker] = useState('');
    const [stock, setStock] = useState({});
    const [user, setUser] = useState("");

    // setStock({
    //     ticker: data.results[0].T,
    //     price: data.results[0].c,
    //     difference: data.results[0].c - data.results[0].o
    // })

    // const myUserId = auth.getProfile()
    //     setUser(myUserId.data._id)

        // useEffect(() => {
        //     const myUserId = auth.getProfile()
        //     setUser(myUserId.data._id)
    
        // }, [user])

        const myUserId = auth.getProfile()

    const fetchData = (ticker, api) => {

        

        fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${api}`)
            .then(res => res.ok && res.json())
            .then(data => setStock({
                ticker: data.results[0].T,
                price: data.results[0].c,
            }))
            .catch(error => (console.log(error)));
    }

    const handleSearch = async (event) => {
        event.preventDefault()
        const api = 'XiuFLImIzxjsT7wzsU_fYh6YnMfUt7aZ'
        fetchData(ticker, api)
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setTicker(value);
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
                                <input placeholder="ticker" id="ticker" type="text" onChange={handleChange}></input>
                                <label htmlFor="ticker"></label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="center-align">
                                <button className="waves-effect waves-light btn" type="submit" name="action" onClick={(event) => handleSearch(event)}>Search</button>
                            </div>
                        </div>
                        <Portfolio user={myUserId.data._id}/>
                        <Buyform ticker={stock.ticker} price={stock.price} difference={stock.difference} />
                        
                    </div>

                </form>

            </div>

        </>
    );
}

export default Stockform;