const db = require('../../../db')
const excelJS = require("exceljs");

const User = [
    {
        fname: "John",
        lname: "Doe",
        email: "john.doe@example.com",
        gender: "Male",
    },
    {
        fname: "Jane",
        lname: "Doe",
        email: "jane.doe@example.com",
        gender: "Female",
    },
    {
        fname: "Bob",
        lname: "Smith",
        email: "bob.smith@example.com",
        gender: "Male",
    },
];


class FilesController {
    async createWord(req, res) {
        const dataFromRequest = req.body ?? {};
    }

    async createExcel(req, res) {
        const dataFromRequest = req.body ?? {};
        console.log(req.params.name);
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Users");

        worksheet.columns = [
            { header: "First Name", key: "fname", width: 15 },
            { header: "Last Name", key: "lname", width: 15 },
            { header: "Email", key: "email", width: 25 },
            { header: "Gender", key: "gender", width: 10 },
        ];

        User.forEach(user => { worksheet.addRow(user); });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"); res.setHeader("Content-Disposition", "attachment; filename=" + "users.xlsx");

        workbook.xlsx.write(res).then(() => res.end());
    }

}

module.exports = new FilesController();