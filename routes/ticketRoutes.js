const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/', ticketController.createTicket);          // Create ticket
router.get('/', ticketController.getTickets);             // Get all tickets
router.get('/called', ticketController.getTicketsCalled); // Get called tickets
router.post('/next', ticketController.callNextTicket);    // Call next ticket
router.post('/:id/close', ticketController.closeTicket);  // Close ticket
router.post('/:id/cancel', ticketController.cancelTicket);// Cancel ticket

module.exports = router;