import React, { useState, useRef, useEffect } from 'react';
import './stockform.css'
import auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_PORTFOLIO, ADD_ASSET } from '../../utils/mutations';



function Buyform(props) {

    const inputPrice = useRef();
    const inputTicker = useRef();

    const [amount, setAmount] = useState();
    const [bulkPurchase, setBulkPurchase] = useState(0);

    const [addAsset, { error }] = useMutation(ADD_ASSET);

    useEffect(() => {
        const num = props.price * amount
        num.toFixed(2)
        setBulkPurchase(num);
    }, [amount, props.price])

    const handleChange = (event) => {
        const { value } = event.target;
        setAmount(value);
        setBulkPurchase(props.price * amount);
    };
    //holds obj to send to add portfolio
    const handleAddStock = async (event) => {
        event.preventDefault()

        const myID = auth.getProfile()
        const purchasePrice = parseFloat(inputPrice.current.innerHTML)
        const quantity = parseInt(amount)

        addAsset({
            variables: {
                userId: myID.data._id,
                purchasePrice,
                ticker: inputTicker.current.innerHTML,
                quantity
            }
        })
    };



    return (
        <>  
            
            <div className="row">
                <div className="center-align" value={props.ticker} ref={inputTicker}>Stock: {props.ticker}</div>
                <div className="center-align" value={props.price} ref={inputPrice}>Price: {props.price}</div>
                <div className="center-align" value={props.price}>Total Purchase Price: {bulkPurchase ? bulkPurchase : 0}</div>
                {/* <div className="center-align">{props.difference}</div> */}
                <input className="input-field col l4 offset-l4 m6 offset-m3 s8 offset-s2" type='number' onChange={handleChange}></input>

                <div className="row">
                    <div className="center-align">
                        <button className="waves-effect waves-light btn" type="submit" name="action"
                            onClick={(event) => handleAddStock(event)}>Search</button>
                    </div>
                </div>

                {/* <div className="row ">
                    <div className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1">
                        <input placeholder="amount" type="int" onChange={handleChange}>{amount}</input>
                    </div>
                </div>

                <div className="row">
                    <div className="center-align">
                        <button className="waves-effect waves-light btn" type="submit" name="action">Search</button>
                    </div>
                </div> */}

            </div>
        </>
    );
}

export default Buyform;