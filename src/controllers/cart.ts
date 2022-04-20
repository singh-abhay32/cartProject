import express, { Request, Response } from "express";
import { datalog } from '../task-manager/db';

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin

} = require("../middlewres/auth.middleware")


const updatecartproducts = async (req: Request, res: Response) => {
    let token = req.get("authorization") || ''
    console.log(token);
    function parseJwt(token: string): any {
        var base64Url = token.split('.')[1];
        var jsonPayload = Buffer.from(base64Url, "base64").toString()
        console.log(jsonPayload);
        return JSON.parse(jsonPayload);

    };

    let decoded = parseJwt(token)
    let query2 = `SELECT * FROM products WHERE id = ${(datalog.escape(req.body.productid))}`
    datalog.query(query2, [req.body.productid], (err, rows) => {
        if (err) throw err;
        console.log(rows)
        if (rows[0].unit > 0) {
            let query3 = `UPDATE products SET unit = ${(datalog.escape(rows[0].unit - 1))} WHERE id = ${(datalog.escape(req.body.productid))}`
            datalog.query(query3, [req.body.productid], (err, rows) => {
                if (err) throw err;
                console.log(rows)

                let query = `SELECT * FROM carts WHERE id = ${(datalog.escape(decoded.id))} and productid = ${(datalog.escape(req.body.productid))}`
                datalog.query(query, [req.body.productid], (err, rows) => {
                    if (err) throw err;
                    console.log(rows)

                    if (rows.length != 0) {
                        let units = parseInt(rows[0].unit)
                        let uquery = `UPDATE carts SET unit = ${(datalog.escape(units + 1))}  WHERE id = ${(datalog.escape(decoded.id))} and productid = ${(datalog.escape(req.body.productid))}`
                        datalog.query(uquery, [req.body.productid], (err, rows) => {
                            if (err) throw err;
                            res.send({ message: "Update successfully" })
                        });
                    } else {
                        let query = `INSERT INTO carts (id,productid,unit) VALUES (${datalog.escape(decoded.id)},${datalog.escape(req.body.productid)},1)`;
                        datalog.query(query, (err: any, rows) => {
                            if (err) throw err;
                            res.send({ message: "Data added successfully" })
                        });
                    }
                });
            });
        };
    });


};
const deletecartproducts = async (req: Request, res: Response) => {
    let token = req.get("authorization") || ''
    console.log(token);
    function parseJwt(token: string): any {
        var base64Url = token.split('.')[1];
        var jsonPayload = Buffer.from(base64Url, "base64").toString()
        console.log(jsonPayload);
        return JSON.parse(jsonPayload);

    };
    let decoded = parseJwt(token)
    let query = `DELETE FROM carts WHERE id = ${(datalog.escape(decoded.id))} and productid = ${(datalog.escape(req.body.productid))}`;
    datalog.query(query, (err, rows) => {
        if (err) throw err;
        res.send({ message: "Data delete succesfylly" })
    })
};

export default { updatecartproducts, deletecartproducts }