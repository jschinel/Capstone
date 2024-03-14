// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the comment collection
const eventSchema = new mongoose.Schema(
    {
        startDate: { type: String, required: true },
        endDate: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
        description:{ type:String, required: false},
        color:{ type:String, required: true},
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    }
);

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Event', eventSchema);