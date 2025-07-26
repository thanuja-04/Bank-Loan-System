// server.js
const express = require('express');
const cors = require('cors');  // <-- add this
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes/bankRoutes');

app.use(cors({
  origin: "*", // or specifically your Netlify domain if needed
  methods: ["GET", "POST", "PUT", "DELETE"]
}));   // <-- and this line
app.use(bodyParser.json());
app.use('/api', routes);

const PORT = process.env.port || 5000;
app.listen(PORT, () => {
  console.log(`Bank loan system server running on http://localhost:${PORT}`);
});
