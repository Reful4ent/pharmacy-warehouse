require('dotenv').config();
const express = require('express');
const PORT = process.env.REST_PORT || 8080;

const countryRouter = require('./src/country/routes/country.routes');
const bankRouter = require('./src/bank/routes/bank.routes');
const categoryRouter = require('./src/category/routes/category.routes');
const packageRouter = require('./src/package/routes/package.routes');
const postRouter = require('./src/post/routes/post.routes');
const streetRouter = require('./src/street/routes/street.routes');


const routes = [countryRouter,bankRouter,categoryRouter,packageRouter,postRouter,streetRouter];
const app = express();

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));