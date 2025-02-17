const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if (err) {
                // token expired or is invalid
                res.status(401).json({ message: "Token is not valid." });
            } else {
                // token is good
                // req.user = decodedToken
                req.user = { username: decodedToken.username };
                next();
            }
        });
    } else {
        res.status(400).json({ message: 'No authorization token provided.' })
    }
};

 