const crypto = require('crypto');


function HASH(data){
    const sha256Hash = crypto.createHash('sha256');
    sha256Hash.update(data);
    return sha256Hash.digest('hex');
}

module.exports = {
    HASH
}