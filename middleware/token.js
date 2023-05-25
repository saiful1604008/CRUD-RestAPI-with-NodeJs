const jwt = require('jsonwebtoken');

// Generate JWT token
function generateToken(req, res, next) {
    const { username } = req.body;
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ username }, secretKey);

    req.token = token; // Attach token to request object
    next();
}

function verifyToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorizationHeader.replace('Bearer ', '');
    console.log('token:' , token)
    const secretKey = process.env.JWT_SECRET_KEY;

    jwt.verify(token, secretKey, (err, decodedToken) => {
        if (err) {
            console.log('error is:', err)
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = decodedToken;
        console.log('decodetoken',decodedToken)
        next();
    });
}

module.exports = {
    generateToken,
    verifyToken
};
