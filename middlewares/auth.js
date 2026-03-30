const jwt = require('jsonwebtoken');

const SECRET = "MY_SECRET_KEY";

module.exports = (req,res,next)=>{

    const authHeader = req.headers['authorization'];

    if(!authHeader)
        return res.status(401).json({message:"No token"});

    const token = authHeader.split(" ")[1];

    jwt.verify(token,SECRET,(err,user)=>{

        if(err)
            return res.status(403).json({message:"Invalid token"});

        req.user = user;
        next();
    });
};