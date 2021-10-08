const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'You need to leave a thought!',
        minlength: 1,
        maxlength: 280,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            commentText: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 280,
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        },
    ],
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
