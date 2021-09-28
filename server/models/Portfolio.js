const { Schema, model } = require('mongoose');

const portfolioSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    assets: [{ type: Schema.Types.ObjectId, ref: 'Asset' }]
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Portfolio = model('Portfolio', portfolioSchema);
module.exports = Portfolio;