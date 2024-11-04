require('dotenv').config();
const express = require('express');
const PORT = process.env.REST_PORT || 8080;

const countryRouter = require('./src/country/routes/country.routes');

const app = express();

app.use(express.json());
app.use('/api', countryRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));