const db = require('../config/db');


exports.getSettings = (req, res) => {
    db.query('SELECT * FROM settings ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};