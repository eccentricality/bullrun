const express = require('express');
const axios = require('axios').default;
const config = require('config');
const { User, Asset, Portfolio, Stock } = require('../models');

const apiKey = config.get('polygonKey');



async function getPrice(ticker) {
    try {
        const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${ticker}/prev?adjusted=true&apiKey=${apiKey}`);
        return response.data;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    updateStocks: async function () {
        const ownedStocks = await Stock.find();

        //get list of stocks that need updating
        let toBeUpdatedStocks = [];
        for (let x = 0; x < ownedStocks.length; x++) {
            //if updated today check date of update and confirm it is today otherwise set back to false
            if (!ownedStocks[x].updatedToday) {
                toBeUpdatedStocks.push(ownedStocks[x].ticker);
            }
        }

        let counter = 0;
        const max = toBeUpdatedStocks.length;

        //next call get price function every 15 seconds (to stay under API limit) until all stocks are updated
        const intervalObj = setInterval(async function () {
            if (counter === max) {
                clearInterval(intervalObj);
                return;
            }
            const data = await getPrice(toBeUpdatedStocks[counter]);
            const updatedStock = await Stock.findOneAndUpdate({ ticker: toBeUpdatedStocks[counter] }, { previousClosingPrice: data.results[0].c, updatedToday: true });
            console.log(`${toBeUpdatedStocks[counter]} has been updated`);
            counter++;
        }, 13000);
    }

}