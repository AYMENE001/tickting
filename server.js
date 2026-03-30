const express = require('express');
const cors = require('cors');

const ticketRoute = require('./routes/ticketRoutes')
const settingsRoute = require('./routes/settingsRoutes')
const loginRoutes = require('./routes/loginRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

//  Routes
app.use('/api/tickets',ticketRoute);
app.use('/api/settings',settingsRoute);
app.use('/api/login',loginRoutes);
app.use('/api/user',userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});