import express, { Request, Response } from "express";
import { datalog } from '../task-manager/db';
import products from './products';

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin

} = require("../middlewres/auth.middleware")


 const updatecartproducts = async(req:Request,res:Response)=>{
     let query =`UPDATE products SET productid = ${datalog.escape(req.body.productid)} WHERE id = ${(datalog.escape(req.body.unit))}`;
     datalog.query(query,(err,rows)=>{
         if(err)throw err;
         res.send({rows})
     })
     if(!products)
     return res.status(400).send('the category cannot be created')
 };

 const deletecartproducts =async(req:Request,res:Response)=>{
     let query =`DELETE FROM products WHERE id = ${(datalog.escape(req.params.productid))}`;
     datalog.query(query,(err,rows)=>{
         if(err)throw err;
         res.send({rows})
     })
     if(!products)
     return res.status(400).send('user deleted succesfully')
 };

 export default{updatecartproducts,deletecartproducts}