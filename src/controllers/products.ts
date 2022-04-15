import { Request, Response, NextFunction, query } from 'express';
import axios, { AxiosResponse } from 'axios';
import { datalog } from '../task-manager/db';

interface Post {
    name: string;
    id: Number;
    title: String;
    body: String;
}
const getproduct= async (req: Request, res: Response) => {
    let query = `SELECT * FROM products WHERE id = ${(datalog.escape(req.params.id))}`;
    datalog.query(query, (err, rows) => {
        if (err) throw err;
        res.send({ rows })
    })
};
    const getproducts = async (req: Request, res: Response) => {
        let query = 'SELECT * FROM products';
        datalog.query(query, (err, rows) => {
            if (err) throw err;
            res.send({ rows })
        });;
    };
    const updateproducts = async (req: Request, res: Response) => {
            
            let query = `UPDATE products SET products = ${datalog.escape(req.body.productName)} WHERE id = ${(datalog.escape(req.params.id))}`;
            datalog.query(query, (err, rows) => {
                if (err) throw err;
            });
            res.send({message: "Data updated"})
    };
    const deleteproduct= async (req: Request, res: Response) => {
            let query = `DELETE FROM products WHERE id = ${(datalog.escape(req.params.id))}`;
            datalog.query(query, (err, rows) => {
                if (err) throw err;
                res.send({message: "Deleted Successfully"})
            });
    };

    const addproduct = async (req: Request, res: Response) => {
        let query = `INSERT INTO products (name,price,unit) VALUES (${datalog.escape(req.body.name)},${datalog.escape(req.body.price)},${datalog.escape(req.body.unit)})`;
        datalog.query(query, (err: any, rows) => {
            if (err) throw err;
            res.send({message: "Data added successfully"})
        });
    };

    export default { getproduct, getproducts, addproduct, updateproducts, deleteproduct };