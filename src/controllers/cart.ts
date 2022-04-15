import express from 'express'
import { verify } from 'jsonwebtoken';
import { createAbstractBuilder } from 'typescript';
import cart from "../controllers/";
import products from './products';

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin

} = require("../middlewres/auth.middleware")

const router = require("express").Router();

router.post("/cart", async (req: { body: { productId: any; quantity: any; name: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; }) => {
    const { productId, quantity, name } = req.body;

    const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id

    try {
        try {
            let carts = await cart.findOne({ products });

            if (cart) {
                //cart exists for user
                let itemIndex = cart.products.findIndex((products: any) => p.productId == products);

                if (itemIndex > -1) {
                    //product exists in the cart, update the quantity
                    let productItem = cart.products[itemIndex];
                    productItem.quantity = quantity;
                    cart.products[itemIndex] = productItem;
                } else
                    //no cart for user, create new cart
                    const newCart = await cart.create({
                        userId,
                        products: [{ productId, quantity, userId }]
                    });

                return res.status(201).send(newCart);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send("Something went wrong");
        }
    }
});
