const { Schema, model } = require('mongoose');

const assetSchema = new Schema({

    ticker: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    purchasePrice: {
        type: Number,
        required: false
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Asset = model('Asset', assetSchema);
module.exports = Asset;
