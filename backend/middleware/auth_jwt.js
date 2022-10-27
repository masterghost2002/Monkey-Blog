const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = 'ACCESS_TOKEN';
const generate_access_token = (user)=>{
    const token  = jwt.sign(user,ACCESS_TOKEN_SECRET);
    return token;
};
const verify_token = (ACCESS_TOKEN)=>{
    const user = jwt.verify(ACCESS_TOKEN, ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return null;
        return user;
    })
    return user;
}

module.exports = {generate_access_token, verify_token};