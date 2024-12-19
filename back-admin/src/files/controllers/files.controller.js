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
                                                buyer.tin AS "ИНН",
                                                street.name AS "Улица",
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
                                                street ON buyer.street_id = street.id
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

        let columns = Object.keys(responseDb.rows[0]);
        columns = columns.filter((_, index) => index > 5 && index < columns.length - 1);

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

        const footerRow = new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph("Всего к оплате:")],
                    }),
                    new TableCell({
                        children: [new Paragraph(`${responseDb.rows[0]['Итоговая цена']}`)],
                    }),
                ],
        })

        const dataTable = new Table({
            rows: [headerRow, ...rows, footerRow],
            width: {
                size: 100,
                type: "pct",
            },
        });

        // Заголовок документа
        const header = new Paragraph({
            children: [
                new TextRun({
                    text: `СЧЕТ-ФАКТУРА №${responseDb.rows[0]['Номер']} oт ${responseDb.rows[0]['Дата выписки']}`,
                    bold: true,
                    size: 28,
                }),
            ],
            alignment: "center",
        });
        const header_2 = new Paragraph({
            children: [
                new TextRun({
                    text: `ИСПРАВЛЕНИЕ № ___________ oт __________ `,
                    bold: true,
                    size: 28,
                }),
            ],
            alignment: "center",
        });

        const fields = [
            "Продавец: Аптечный склад №1",
            "Адрес: Улица Баумана д31",
            "ИНН/КПП продавца: 511833352511",
            "Грузоотправитель и его адрес: CДЕК, Пахомово д45",
            "Грузополучатель и его адрес: СДЕК, Блюхера д123",
            `К платежно-расчетному документу №: ${Math.floor(1 + Math.random() * (5000 + 1 - 1))}`,
            `Покупатель: ${responseDb.rows[0]['Покупатель']}`,
            `Адрес: г.Новосибирск ул.${responseDb.rows[0]['Улица']} д.${Math.floor(1 + Math.random() * (40 + 1 - 1))}`,
            `ИНН/КПП покупателя: ${responseDb.rows[0]['ИНН']}`,
            "Валюта: Рубли",
        ].map(field => new Paragraph(field));

        // Итоговая таблица

        const footerTable = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("Руководитель организации или иное уполномоченное лицо")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },

                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "single" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                            width: {
                                size: 20,  // Ширина в процентах
                                type: "pct",
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "single" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                            width: {
                                size: 20,  // Ширина в процентах
                                type: "pct",
                            },
                        }),
                    ],
                    margins: {
                        top: 20,
                        bottom: 20,
                        left: 0,
                        right: 0,
                    },
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                            width: {
                                size: 20,  // Ширина в процентах
                                type: "pct",
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                            width: {
                                size: 20,  // Ширина в процентах
                                type: "pct",
                            },
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("Главный бухгалтер или иное уполномоченное лицо")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "single" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                            width: {
                                size: 20,  // Ширина в процентах
                                type: "pct",
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "single" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                            width: {
                                size: 20,  // Ширина в процентах
                                type: "pct",
                            },
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                            width: {
                                size: 20,  // Ширина в процентах
                                type: "pct",
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                            width: {
                                size: 20,  // Ширина в процентах
                                type: "pct",
                            },
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            children: [new Paragraph("Индивидуальный предприниматель или иное уполномоченное лицо")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "single" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                            width: {
                                size: 20,  // Ширина в процентах
                                type: "pct",
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "none" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                        }),
                        new TableCell({
                            children: [new Paragraph("")],
                            borders: {
                                top: { style: "none" },
                                bottom: { style: "single" },
                                left: { style: "none" },
                                right: { style: "none" },
                            },
                            width: {
                                size: 20,  // Ширина в процентах
                                type: "pct",
                            },
                        }),
                    ],
                }),
            ],
            width: {
                size: 100,
                type: "pct",
            },
            borders: {
                top: { style: "none" },
                bottom: { style: "none" },
                left: { style: "none" },
                right: { style: "none" },
            },
        });

        // Создание документа
        const doc = new Document({
            sections: [
                {
                    children: [
                        header,
                        header_2,
                        new Paragraph(" "),
                        ...fields,
                        new Paragraph(" "),
                        new Paragraph(" "),
                        dataTable,
                        new Paragraph(" "),
                        new Paragraph(" "),
                        footerTable,
                    ],
                },
            ],
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