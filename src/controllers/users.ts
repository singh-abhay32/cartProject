import { Request, Response, NextFunction, query } from 'express';
import { datalog } from '../task-manager/db';

interface Post {
    userName: Number;
    id: Number;
    title: String;
    body: String;
}
const getUser = async (req: Request, res: Response) => {
    let query = `SELECT * FROM users WHERE id = ${(datalog.escape(req.params.id))}`;
    datalog.query(query, (err, rows) => {
        if (err) throw err;
        console.log(rows);
        res.send({ rows })
    })
};
    const getAllUsers = async (req: Request, res: Response) => {
        let query = 'SELECT * FROM users';
        datalog.query(query, (err, rows) => {
            if (err) throw err;
            console.log(rows);
            res.send({ rows })
        });;
    };
    const updateUser = async (req: Request, res: Response) => {
            let query =
            `UPDATE users SET name = ${datalog.escape(req.body.name)} WHERE id = ${(datalog.escape(req.params.id))}`;
            datalog.query(query,[req.body.name,req.params.id],(err, rows) => {
                if (err) throw err;
                console.log(rows);
                res.send({message:"updated successfully"})
            });
    };
    const deleteUser = async (req: Request, res: Response) => {
            let query = `DELETE FROM users WHERE id = ${(datalog.escape(req.params.id))}`;
            datalog.query(query, (err, rows) => {
                if (err) throw err;
                res.send({message: "Deleted Successfully"})
            });
    };
    const addUser = async (req: Request, res: Response) => {
        const {name,usertype,email,password} = req.body;
        let query = `INSERT INTO users (name, usertype,email, password) VALUES(${"'"+name+"','"+usertype+"','"+email+"','"+password+"'"})`
        
        // console.log(query)
        datalog.query(query, (err: any, rows) => {
            if (err) throw err;
            res.send({ Data: "Added successfully" })
        });
    };

    export default { getAllUsers, getUser, addUser, updateUser, deleteUser };