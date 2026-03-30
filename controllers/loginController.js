const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = "MY_SECRET_KEY";

exports.login = (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username=?";

    db.query(sql,[username], async(err,result)=>{

        if(err || result.length === 0)
            return res.json({success:false});

        const  user = result[0];
        console.log('result',user)
        const match = await bcrypt.compare(password,user.password);
 console.log('match',match)
        if(!match)
            return res.json({success:false});

        // CREATE TOKEN
        const token = jwt.sign(
            {
                id:user.id,
                username:user.username,
                guichet:user.guichet
            },
            SECRET,
            { expiresIn:"8h" }
        );

        res.json({
            success:true,
            token
        });
    });
};