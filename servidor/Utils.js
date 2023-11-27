const jwt = require('jsonwebtoken')



function isTokenExpired(exp) {
    const currentTimestamp = Math.floor(Date.now() / 1000); // current time in seconds
    return exp < currentTimestamp;
}

function generateAccessToken(payload) {
    // return jwt.sign(payload, process.env.JWT_SECRET as string, {expiresIn: '90s'}) // 30s
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '3h'}) 
}

function decodeAccessToken(token) {
    try {
        return jwt.decode(token)
    } catch (err) {
        return null;
    } 
}

function verifyAccessToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return null;
    } 
}

function isRefreshTokenValid(token){
    return jwt.decode(token)
}

function decodeRegistrationToken(token) {
    return jwt.decode(token)
}

function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '86.400s'}) // 1 dia
};

function generateRegistrationToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '120s'}) // 2min
}

function generateSMSCode() {
    return (Math.floor(Math.random() * 900000) + 100000).toString();
}


function generateWsId() {
    return (Math.floor(Math.random() * 900000) + 100000).toString();
}

module.exports = {
    generateAccessToken,
    decodeAccessToken,
    verifyAccessToken
}