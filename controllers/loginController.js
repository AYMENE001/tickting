const db = require('../config/db');
const bcrypt = require('bcrypt')

exports.login = (req, res) => {
const {username,password} = req.body;

    const sql = "SELECT * FROM users WHERE username=?";

    db.query(sql,[username], async(err,result)=>{

        if(err) return res.json({success:false});

        if(result.length === 0)
            return res.json({success:false});

        const user = result[0];

        // if password hashed
        const match = await bcrypt.compare(password,user.password);

        if(!match)
            return res.json({success:false});

        res.json({
            success:true,
            user:{
                id:user.id,
                username:user.username,
                guichet:user.guichet
            }
        });

    });
};


