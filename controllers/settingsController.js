const db = require('../config/db');


exports.getSettings = (req, res) => {
    db.query('SELECT * FROM settings ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.updateSetting = (req,res)=>{

    const {id}=req.params;
    const {value}=req.body;

    db.query(
        "UPDATE settings SET value=? WHERE id=?",
        [value,id],
        err=>{
            if(err) return res.status(500).json(err);

            res.json({success:true});
        }
    );
};