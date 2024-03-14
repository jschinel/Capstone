// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the comment collection
const commentSchema = new mongoose.Schema(
    {
        name: { type: String, required: false },
        content: { type: String, required: false },
        type:{type: String, required: true},
        contentName: { type: String, required: true},
        actualContent: { type: String, require: true},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Comment', commentSchema);