import React, { useState, useRef } from 'react';
import './stockform.css'
import auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_PORTFOLIO, ADD_ASSET } from '../../utils/mutations';



function Buyform(props) {

    const inputPrice = useRef();
    const inputTicker = useRef();

    const [amount, setAmount] = useState(0);
    const [addstock, setAddStock] = useState({});

    const [createportfolio, { error, data }] = useMutation(ADD_PORTFOLIO);
    const [addNewAsset, setTest] = useMutation(ADD_ASSET);

    const createNewPortflio = async (event) => {
        event.preventDefault();
            
        try {
            const newID = auth.getProfile()

            await createportfolio({
                userId: newID.data._id,
            });
            
        } catch (event) {
            console.error(event);
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setAmount(value);
    };
    //holds obj to send to add portfolio
    const handleAddStock = async (event) => {
        event.preventDefault()

        const myID = auth.getProfile()

        const purchasePrice = Number(inputPrice.current.innerHTML)
        const quantity = Number(amount)

        setAddStock({
            userId: myID.data._id,
            purchasePrice,
            ticker: inputTicker.current.innerHTML,
            quantity
        })

        addNewAsset(addstock)
    };



    return (
        <>
            <div className="row">
                <div className="center-align" value={props.ticker} ref={inputTicker}>{props.ticker}</div>
                <div className="center-align"  value={props.price} ref={inputPrice}>{props.price}</div>
                <div className="center-align">{props.difference}</div>
                <input className="input-field col l6 offset-l3 m8 offset-m2 s10 offset-s1" onChange={handleChange}></input>

                <div className="row">
                            <div className="center-align">
                                <button className="waves-effect waves-light btn" type="submit" name="action" 
                                onClick={(event) => handleAddStock(event)}>Search</button>
                            </div>
                        </div>

                        <div className="row">
                            <div className="center-align">
                                <button className="waves-effect waves-light btn" type="submit" name="action" 
                                onClick={(event) => createNewPortflio(event)}>Create Portfolio</button>
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