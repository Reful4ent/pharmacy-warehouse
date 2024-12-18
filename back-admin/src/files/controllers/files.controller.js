const db = require('../../../db')
const excelJS = require("exceljs");
const fs = require('fs');
const path = require('path');
const { Document, Packer, Table, TableRow, TableCell, TextRun, Paragraph} = require('docx');

const CONCRETE_NAMES = ['invoice', 'statements']

class FilesController {
    async createWord(req, res) {
        const nameDb = req.params.name ?? '';
        const number = req.query.number


        let responseDb;
        try {
            if(nameDb === 'invoice') {
                responseDb = await db.query(`SELECT 
                                                invoice.number AS "Номер", 
                                                TO_CHAR(invoice.discharge_date, 'YYYY-MM-DD') AS "Дата выписки", 
                                                employee.surname AS "Фамилия сотрудника",
                                                buyer.name AS "Покупатель",
                                                medicine.name AS "Лекарство", 
                                                TO_CHAR(medicine.production_date, 'YYYY-MM-DD') AS "Дата производства", 
                                                medicine.registration_num AS "Регистрационный номер", 
                                                TO_CHAR(medicine.expiration_date, 'YYYY-MM-DD') AS "Срок годности", 
                                                invoice_medicine.price_that_time AS "Цена на момент покупки", 
                                                invoice_medicine.quantity AS "Количество", 
                                                invoice.total_sum AS "Итоговая цена"
                                            FROM 
                                                invoice
                                            JOIN 
                                                invoice_medicine ON invoice.id = invoice_medicine.invoice_id
                                            JOIN 
                                                employee ON invoice.employee_id = employee.id
                                            JOIN
                                                buyer ON invoice.buyer_id = buyer.id
                                            JOIN 
                                                medicine ON invoice_medicine.medicine_id = medicine.id
                                            WHERE ($1::text IS NULL OR number ILIKE $1)`,[`%${number}%`]);
            } else if (nameDb === 'statements') {
                responseDb = await db.query(`SELECT 
                                                statements.number AS "Номер", 
                                                statements.receipt_date AS "Дата получения", 
                                                medicine.name AS "Лекарство", 
                                                medicine.production_date AS "Дата производства", 
                                                medicine.registration_num AS "Регистрационный номер", 
                                                medicine.expiration_date AS "Срок годности", 
                                                statements_medicine.price_that_time AS "Цена на момент покупки", 
                                                statements_medicine.quantity AS "Количество", 
                                                statements.total_sum AS "Итоговая цена"
                                            FROM 
                                                statements
                                            JOIN 
                                                statements_medicine ON statements.id = statements_medicine.statements_id
                                            JOIN 
                                                medicine ON statements_medicine.medicine_id = medicine.id;`);
            } else {
                responseDb = await db.query(`SELECT * FROM ${nameDb}`);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
        const columns = Object.keys(responseDb.rows[0])

        const rows = responseDb.rows.map(row => {
            return new TableRow({
                children: columns.map(column => {
                    return new TableCell({
                        children: [new Paragraph(row[column]?.toString() || '')],
                    });
                }),
            });
        });

        const headerRow = new TableRow({
            children: columns.map(column => {
                return new TableCell({
                    children: [new Paragraph(column)],
                });
            }),
        });

        const table = new Table({
            rows: [headerRow, ...rows],
            columnWidths: Array(columns.length).fill(2000), // Установка ширины колонок
        });


        const doc = new Document({
            sections: [{
                children: [table],
            }],
        });

        const b64string = await Packer.toBase64String(doc);

        res.setHeader('Content-Disposition', `attachment; filename=${nameDb}.docx`);
        res.send(Buffer.from(b64string, 'base64'));
    }

    async createExcel(req, res) {
        const nameDb = req.params.name ?? '';
        const number = req.query.number

        let responseDb;
        try {
            if(nameDb === 'invoice') {
                responseDb = await db.query(`SELECT 
                                                invoice.number AS "Номер", 
                                                TO_CHAR(invoice.discharge_date, 'YYYY-MM-DD') AS "Дата выписки", 
                                                employee.surname AS "Фамилия сотрудника",
                                                buyer.name AS "Покупатель",
                                                medicine.name AS "Лекарство", 
                                                TO_CHAR(medicine.production_date, 'YYYY-MM-DD') AS "Дата производства", 
                                                medicine.registration_num AS "Регистрационный номер", 
                                                TO_CHAR(medicine.expiration_date, 'YYYY-MM-DD') AS "Срок годности", 
                                                invoice_medicine.price_that_time AS "Цена на момент покупки", 
                                                invoice_medicine.quantity AS "Количество", 
                                                invoice.total_sum AS "Итоговая цена"
                                            FROM 
                                                invoice
                                            JOIN 
                                                invoice_medicine ON invoice.id = invoice_medicine.invoice_id
                                            JOIN 
                                                employee ON invoice.employee_id = employee.id
                                            JOIN
                                                buyer ON invoice.buyer_id = buyer.id
                                            JOIN 
                                                medicine ON invoice_medicine.medicine_id = medicine.id
                                            WHERE ($1::text IS NULL OR number ILIKE $1)`,[`%${number}%`]);
            } else if (nameDb === 'statements') {
                responseDb = await db.query(`SELECT 
                                                statements.number AS "Номер", 
                                                statements.receipt_date AS "Дата получения", 
                                                medicine.name AS "Лекарство", 
                                                medicine.production_date AS "Дата производства", 
                                                medicine.registration_num AS "Регистрационный номер", 
                                                medicine.expiration_date AS "Срок годности", 
                                                statements_medicine.price_that_time AS "Цена на момент покупки", 
                                                statements_medicine.quantity AS "Количество", 
                                                statements.total_sum AS "Итоговая цена"
                                            FROM 
                                                statements
                                            JOIN 
                                                statements_medicine ON statements.id = statements_medicine.statements_id
                                            JOIN 
                                                medicine ON statements_medicine.medicine_id = medicine.id;`);
            } else {
                responseDb = await db.query(`SELECT * FROM ${nameDb}`);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet(`${nameDb}`);
        const columns = Object.keys(responseDb.rows[0]).map(columnName => ({header: columnName, key: columnName, width: 30}));

        worksheet.columns = columns;
        responseDb.rows.forEach(response => {
            const row = worksheet.addRow(response);
            row.eachCell(cell => {
                cell.alignment = { vertical: 'top', horizontal: 'left' };
            });
        });


        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"); res.setHeader("Content-Disposition", "attachment; filename=" + `${nameDb}.xlsx`);

        workbook.xlsx.write(res).then(() => res.end());
    }

}

module.exports = new FilesController();