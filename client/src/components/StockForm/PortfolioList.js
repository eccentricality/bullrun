import React, { useState } from 'react';
import './stockform.css'
import { useMutation } from '@apollo/client';
import { SELL_ASSET, QUERY_PORTFOLIO } from '../../utils/mutations';



function PortfolioList({ portfolioAssets, totalAssets, myID }) {

    const [sellAsset, { error }] = useMutation(SELL_ASSET);
    const [sellQuantity, setSellQuantity] = useState();

    const handleChange = (event) => {
        const { value } = event.target;
        const myAmount = parseInt(value)
        setSellQuantity(myAmount);
    };
    //holds obj to send to add portfolio
    const handleSellStock = async (event) => {
        event.preventDefault()
        console.log({
            userId: myID.data._id,
            assetId: event.target.dataset._id,
            sellPrice: event.target.dataset.price,
            quantity: sellQuantity
        })
        const myPrice = parseInt(event.target.dataset.price)

        await sellAsset({
            variables: {
                userId: myID.data._id,
                assetId: event.target.dataset._id,
                sellPrice: myPrice,
                quantity: sellQuantity
            }
        })
    };

    if (!portfolioAssets === []) {
        return <h3>No Assets Yet!</h3>;
    }

    return (
        <>
            <div className="margin-bottom-big margin-top-small">
                <div className="row">
                    <div className="center-align">
                        <h4 className="text no-margin-bottom">Stock Portfolio</h4>
                        <h6 className="text no-margin-bottom boldUnderlined">Asset value: {totalAssets}</h6>
                    </div>
                </div>

                <table className='centered'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Item Name</th>
                            <th>Item Price</th>
                            <th>Quanity</th>
                            <th>Sell</th>
                        </tr>
                    </thead>

                    {portfolioAssets &&
                        portfolioAssets.map((portfolioAsset) => (
                            <tr>
                                <td>{portfolioAsset.ticker}</td>
                                <td>{portfolioAsset.purchasePrice}</td>
                                <td>{portfolioAsset.quantity}</td>
                                <td><input className="max-width" type='number' onChange={handleChange}></input></td>
                                <td><button className="waves-effect waves-light btn" type="submit"
                                    onClick={(event) => handleSellStock(event)}
                                    data-_id={portfolioAsset._id}
                                    data-price={portfolioAsset.purchasePrice}
                                    data-quantity={portfolioAsset.quantity}
                                >Sell</button></td>
                            </tr>
                        ))}
                    <tbody>

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default PortfolioList;