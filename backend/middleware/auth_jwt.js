const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = 'cfa13668eb8175212736ee4d89c7da86ee3b96587a712823511c327aaeb2886c01595f7cfa9cf13b37390d20fa9732b79fc28c0a5cbf7f17cc33dc52399a0306';
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