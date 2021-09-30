const { Schema, model } = require('mongoose');

const stockSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ticker: {
        type: String,
        required: true
    },
    previousClosingPrice: {
        type: Number,
        required: true
    },
    updatedToday: {
        type: Boolean,
        required: true
    },
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Stock = model('Stock', stockSchema);
module.exports = Stock;
