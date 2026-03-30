const db = require('../config/db');
const bcrypt = require('bcrypt')


// ========================
// CREATE USER
// ========================
exports.createUser = async (req, res) => {
    const { username, password, guichet } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO users (username, password, guichet)
            VALUES (?, ?, ?)
        `;

        db.query(sql, [username, hashedPassword, guichet], (err, result) => {
            if (err) return res.json({ success: false });

            res.json({ success: true, message: "User created" });
        });

    } catch (error) {
        res.json({ success: false });
    }
};


// ========================
// READ ALL USERS
// ========================
exports.getUsers = (req, res) => {

    const sql = "SELECT id, username, guichet FROM users";

    db.query(sql, (err, result) => {
        if (err) return res.json({ success: false });

        res.json({ success: true, users: result });
    });
};


// ========================
// GET SINGLE USER
// ========================
exports.getUserById = (req, res) => {

    const { id } = req.params;

    db.query(
        "SELECT id, username, guichet FROM users WHERE id=?",
        [id],
        (err, result) => {
            if (err || result.length === 0)
                return res.json({ success: false });

            res.json({ success: true, user: result[0] });
        }
    );
};


// ========================
// UPDATE USER
// ========================
exports.updateUser = async (req, res) => {

    const { id } = req.params;
    const { username, password, guichet } = req.body;

    try {

        let sql;
        let values;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            sql = `
                UPDATE users
                SET username=?, password=?, guichet=?
                WHERE id=?
            `;

            values = [username, hashedPassword, guichet, id];

        } else {
            sql = `
                UPDATE users
                SET username=?, guichet=?
                WHERE id=?
            `;

            values = [username, guichet, id];
        }

        db.query(sql, values, (err) => {
            if (err) return res.json({ success: false });

            res.json({ success: true, message: "User updated" });
        });

    } catch (error) {
        res.json({ success: false });
    }
};


// ========================
// DELETE USER
// ========================
exports.deleteUser = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM users WHERE id=?",
        [id],
        (err) => {
            if (err) return res.json({ success: false });

            res.json({ success: true, message: "User deleted" });
        }
    );
};