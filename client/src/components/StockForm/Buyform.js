import React, { useState, useRef, useEffect } from 'react';
import './stockform.css'
import auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_ASSET, QUERY_PORTFOLIO } from '../../utils/mutations';
import PortfolioList from './PortfolioList'


const myID = auth.getProfile()

function Buyform({ price, ticker, userID }) {


    //this is all the needed stuff to search a ticker and then buy it
    const inputPrice = useRef();
    const inputTicker = useRef();

    const [amount, setAmount] = useState();
    const [bulkPurchase, setBulkPurchase] = useState(0);

    const [portfolioAssets, setPortfolioAssets] = useState([]);
    const [totalCash, setTotalCash] = useState(0);
    const [totalAssets, setTotalAssets] = useState(0);

    const [addAsset, { error }] = useMutation(ADD_ASSET);

    const [queryPortfolio, { error: portfolioerror }] = useMutation(QUERY_PORTFOLIO);

    useEffect(() => {
        const num = price * amount
        num.toFixed(2)
        setBulkPurchase(num);

    }, [amount, price])

    useEffect(() => {
        if (auth.getProfile()) {
            const mountedQuery = async () => {
                const newTest = await queryPortfolio({
                    variables: { userId: myID.data._id },
                })
                setPortfolioAssets(newTest.data.portfolio.assets)
                console.log(newTest)

                //total cash
                const myTotalCashUnrounded = newTest.data.portfolio.totalCash
                const myTotalCash = myTotalCashUnrounded.toFixed(2)
                setTotalCash(myTotalCash)
                //total assets 
                const myTotalAssetValueUnrounded = newTest.data.portfolio.totalAssetValue
                const myTotalAssetValue = myTotalAssetValueUnrounded.toFixed(2)
                setTotalAssets(myTotalAssetValue)
            }

            mountedQuery()
        }
    }, [queryPortfolio])

    const handleChange = (event) => {
        const { value } = event.target;
        setAmount(value);
        setBulkPurchase(price * amount);
    };
    //holds obj to send to add portfolio
    const handleAddStock = async (event) => {
        event.preventDefault()
        const purchasePrice = parseFloat(inputPrice.current.innerHTML)
        const quantity = parseInt(amount)
        // console.log("id " + myID.data._id, "price " + purchasePrice, "quanity " + quantity, "ticker " + inputTicker.current.innerHTML)
        await addAsset({
            variables: {
                userId: myID.data._id,
                purchasePrice,
                ticker: inputTicker.current.innerHTML,
                quantity
            }
        })
        const test = await queryPortfolio({
            variables: { userId: myID.data._id },
        })

        setPortfolioAssets(test.data.portfolio.assets)

        //total cash
        const myTotalCashUnrounded = test.data.portfolio.totalCash
        const myTotalCash = myTotalCashUnrounded.toFixed(2)
        setTotalCash(myTotalCash)
        //total assets 
        const myTotalAssetValueUnrounded = test.data.portfolio.totalAssetValue
        const myTotalAssetValue = myTotalAssetValueUnrounded.toFixed(2)
        setTotalAssets(myTotalAssetValue)
    };



    return (
        <>
            <h6 className="text center-align boldUnderlined">Available Cash: {totalCash}</h6>
            <div className="row">
                <div className="center-align" value={ticker} >Stock: <span ref={inputTicker}>{ticker}</span></div>
                <div className="center-align" value={price} >Price: <span ref={inputPrice}>{price}</span></div>
                <div className="center-align" value={price}>Total Purchase Price: {bulkPurchase ? bulkPurchase : 0}</div>
                <input className="input-field col l4 offset-l4 m6 offset-m3 s8 offset-s2" type='number' onChange={handleChange}></input>

                <div className="row">
                    <div className="center-align">
                        <button className="waves-effect waves-light btn" type="submit" name="action"
                            onClick={(event) => handleAddStock(event)}>Buy</button>
                    </div>
                </div>
                <PortfolioList portfolioAssets={portfolioAssets} totalAssets={totalAssets} myID={myID}/>
            </div>
        </>
    );
}

export default Buyform;
