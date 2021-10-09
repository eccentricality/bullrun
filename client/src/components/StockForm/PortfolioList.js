import React from 'react';
import './stockform.css'


function PortfolioList({ portfolioAssets, totalAssets }) {

    console.log(portfolioAssets)

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
                                <td><input className="max-width" type='number'></input></td>
                                <td><button className="waves-effect waves-light btn" type="submit" id={portfolioAsset._id}>Sell</button></td>
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