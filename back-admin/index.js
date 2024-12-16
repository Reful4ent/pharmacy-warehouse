require('dotenv').config();
const express = require('express');
const cors = require('cors')
const PORT = process.env.REST_PORT || 8080;


const countryRouter = require('./src/country/routes/country.routes');
const bankRouter = require('./src/bank/routes/bank.routes');
const categoryRouter = require('./src/category/routes/category.routes');
const packageRouter = require('./src/package/routes/package.routes');
const postRouter = require('./src/post/routes/post.routes');
const streetRouter = require('./src/street/routes/street.routes');
const customRouter = require('./src/custom/routes/custom.routes');
const employeeRouter = require('./src/employee/routes/employee.routes');
const producerRouter = require('./src/producer/routes/producer.routes');
const buyerRouter = require('./src/buyer/routes/buyer.routes');
const supplierRouter = require('./src/supplier/routes/supplier.routes');
const invoiceRouter = require('./src/invoice/routes/invoice.routes');
const statementRouter = require('./src/statement/routes/statement.routes');
const medicineRouter = require('./src/medicine/routes/medicine.routes');
const invoiceMedicineRouter = require('./src/invoice_medicine/routes/invoice_medicine.routes');
const statementMedicineRouter = require('./src/statement_medicine/routes/statement_medicine.routes');
const medicineCategoryRouter = require('./src/medicine_category/routes/medicine_category.routes');
const medicinePackageRouter = require('./src/medicine_category/routes/medicine_category.routes');
const medicineProducerRouter = require('./src/medicine_category/routes/medicine_category.routes');
const menuContextRouter = require('./src/menu_context/routes/menu_context.routes');
const usersContextRouter = require('./src/users/routes/users.routes');
const usersPermissionsContextRouter = require('./src/users_permissions/routes/users_permissions.routes');
const filesRouter = require('./src/files/routes/files.routes');

const routes = [
    countryRouter,
    bankRouter,
    categoryRouter,
    packageRouter,
    postRouter,
    streetRouter,
    customRouter,
    employeeRouter,
    producerRouter,
    buyerRouter,
    supplierRouter,
    invoiceRouter,
    statementRouter,
    medicineRouter,
    invoiceMedicineRouter,
    statementMedicineRouter,
    medicineCategoryRouter,
    medicinePackageRouter,
    medicineProducerRouter,
    menuContextRouter,
    usersContextRouter,
    usersPermissionsContextRouter,
    filesRouter,
];

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', routes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));