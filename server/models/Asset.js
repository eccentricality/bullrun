const { Schema, model } = require('mongoose');

const assetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    ticker: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
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
