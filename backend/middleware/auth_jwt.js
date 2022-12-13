const jwt = require('jsonwebtoken');
const ACESS_AUTH_TOKEN_SECRET_KEY = process.env.ACESS_AUTH_TOKEN_SECRET_KEY;
const generate_access_token = (user)=>{
    const token  = jwt.sign(user,ACESS_AUTH_TOKEN_SECRET_KEY);
    return token;
};
const verify_token = (ACCESS_TOKEN)=>{
    const user = jwt.verify(ACCESS_TOKEN, ACESS_AUTH_TOKEN_SECRET_KEY, (err, user)=>{
        if(err) return null;
        return user;
    })
    return user;
}

module.exports = {generate_access_token, verify_token};