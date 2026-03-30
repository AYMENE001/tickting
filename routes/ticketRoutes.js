const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const auth = require('../middlewares/auth');

router.post('/',  ticketController.createTicket);          // Create ticket
router.get('/', auth,ticketController.getTickets);             // Get all tickets
router.get('/called', ticketController.getTicketsCalled); // Get called tickets
router.post('/next',auth, ticketController.callNextTicket);    // Call next ticket
router.post('/:id/close', auth,ticketController.closeTicket);  // Close ticket
router.post('/:id/cancel',auth, ticketController.cancelTicket);// Cancel ticket

router.get('/export',auth, ticketController.exportRapport);

router.delete('/reset',auth, ticketController.resetTickets);

module.exports = router;