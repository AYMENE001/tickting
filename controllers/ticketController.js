const db = require('../config/db');

// 1️⃣ Create a ticket
exports.createTicket = (req, res) => {
    const { type_service, prioritaire } = req.body;

    const priorityCondition = prioritaire === "Oui" ? "prioritaire='Oui'" : "prioritaire!='Oui'";

    // Get the last ticket number for that queue
    const queryLastTicket = `SELECT * FROM tickets WHERE ${priorityCondition} ORDER BY id DESC LIMIT 1`;

    db.query(queryLastTicket, (err, results) => {
        if (err) return res.status(500).json(err);

        let newNumber;
        if (results.length === 0) {
            newNumber = 1;
        } else {
            const lastTicket = results[0].ticket_number;
            if (prioritaire === "Oui") {
                newNumber = parseInt(lastTicket.split('-')[1]) + 1;
            } else {
                const lastNum = parseInt(lastTicket);
                newNumber = lastNum + 1;
            }
        }

        const newTicket = prioritaire === "Oui" ? `P-${newNumber}` : `${newNumber}`;

        db.query(
            `INSERT INTO tickets (ticket_number, statut, type_service, prioritaire, date_creation)
             VALUES (?, 'en attente', ?, ?, NOW())`,
            [newTicket, type_service, prioritaire],
            (err2) => {
                if (err2) return res.status(500).json(err2);
                res.json({ ticket_number: newTicket });
            }
        );
    });
};

// 2️⃣ Get all tickets
exports.getTickets = (req, res) => {
    db.query('SELECT * FROM tickets ORDER BY id DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// 3️⃣ Get all called tickets
exports.getTicketsCalled = (req, res) => {
    db.query("SELECT * FROM tickets WHERE statut='appelé' ORDER BY date_creation DESC", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// 4️⃣ Call the next ticket (waiting → appelé)
exports.callNextTicket = (req, res) => {
    // Get the first waiting ticket ordered by creation date
    db.query("SELECT * FROM tickets WHERE statut='en attente' ORDER BY date_creation ASC LIMIT 1", (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0) return res.status(404).json({ message: "No waiting tickets" });

        const ticket = results[0];

        db.query(
            "UPDATE tickets SET statut='appelé' WHERE id=?",
            [ticket.id],
            (err2) => {
                if (err2) return res.status(500).json(err2);
                ticket.statut = 'appelé';
                res.json(ticket);
            }
        );
    });
};

// 5️⃣ Close a ticket (appelé → clos)
exports.closeTicket = (req, res) => {
    const { id } = req.params;

    db.query("UPDATE tickets SET statut='clos' WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json(err);

        db.query("SELECT * FROM tickets WHERE id=?", [id], (err2, results) => {
            if (err2) return res.status(500).json(err2);
            res.json(results[0]);
        });
    });
};

// 6️⃣ Cancel a ticket (appelé → abandonné)
exports.cancelTicket = (req, res) => {
    const { id } = req.params;

    db.query("UPDATE tickets SET statut='abandonné' WHERE id=?", [id], (err) => {
        if (err) return res.status(500).json(err);

        db.query("SELECT * FROM tickets WHERE id=?", [id], (err2, results) => {
            if (err2) return res.status(500).json(err2);
            res.json(results[0]);
        });
    });
};