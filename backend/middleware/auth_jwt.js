const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
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
// function to verify the jwt token which is passed in header Bearer
const verify_access_token = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    if(authHeader === undefined) return res.status(401).json({validationError:"Anauthorized User"});
    const ACCESS_TOKEN = authHeader.split(" ")[1];
    if(ACCESS_TOKEN === null) res.status(401);
    const user = verify_token(ACCESS_TOKEN);
    if(user === null) return res.status(401).json({validationError:"Anauthorized User"});
    req.verified_user = user;
    next();
}

module.exports = {generate_access_token, verify_token, verify_access_token};