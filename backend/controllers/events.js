/* Require modules
--------------------------------------------------------------- */
const jwt = require('jwt-simple');
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Require the JWT config
--------------------------------------------------------------- */
const config = require('../../jwt.config.js')


/* Middleware that checks if a JWT sent from the client is valid.
   Used for all routes that require authorization
--------------------------------------------------------------- */
const authMiddleware = (req, res, next) => {
    // Check if the 'Authorization' header is present and has the token
    const token = req.headers.authorization;
    if (token) {
        try {
            // Decode the token using the secret key and add the decoded payload to the request object
            const decodedToken = jwt.decode(token, config.jwtSecret);
            req.user = decodedToken;
            next();
        } catch (err) {
            // Return an error if the token is invalid
            res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // Return an error if the 'Authorization' header is missing or has the wrong format
        res.status(401).json({ message: 'Missing or invalid Authorization header' });
    }
};
/* Routes
---------------------------------------------------------- */
// Index Route (GET/Read): Will display all Events from a certain user
router.get('/', authMiddleware, (req, res) => {
    db.Event.find({ userId: req.user.id })
        .then(events => res.json(events))
})
// Create Route (POST/Create): This route receives a POST request and
// creates a new Event document using the request body
router.post('/', authMiddleware, (req, res) => {
    // Perform any actions that require authorization
    console.log(req.body)
    db.Event.create({
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        description:req.body.description,
        color:req.body.color,
        // The auth middleware validated the JWT token 
        // and added the decoded payload to the req.user object
        userId: req.user.id
    })
        .then(event => res.json(event))
})

// edits the specified event document using the request body
router.put('/:id', authMiddleware, async (req, res) => {
    // Check if the user who sent the update request is the same user who created the event
    const userEvent = await db.Event.findById(req.params.id)
    if (userEvent.userId == req.user.id) {
        // If it is the original author, update the comment
        const newEvent = await db.Event.findByIdAndUpdate(
            req.params.id,
            {
                startDate:req.body.startDate,
                endDate:req.body.endDate,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                description:req.body.description,
                color:req.body.color
            },
            { new: true }
        )
        res.json(newEvent)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})


// Destroy Route (DELETE/Delete): This route deletes a comment document 
// using the URL parameter (which will always be the comment document's ID)
router.delete('/:id', authMiddleware, async (req, res) => {
    // Check if the user who sent the delete request is the same user who created the comment
    const userEvent = await db.Event.findById(req.params.id)
    if (userEvent.userId == req.user.id) {
        const deletedEvent = await db.Event.findByIdAndDelete(req.params.id)
        res.send('You deleted comment ' + deletedEvent._id)
    } else {
        res.status(401).json({ message: 'Invalid user or token' });
    }
})
/* Export these routes so that they are accessible in `server.js`
---------------------------------------------------------- */
module.exports = router