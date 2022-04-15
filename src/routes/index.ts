import express from 'express';
import userController from '../controllers/users';
import productContrller from '../controllers/products'
import authController from '../controllers/auth'
import cartproduct from '../controllers/cart';
const router = express.Router();

router.get('/users', userController.getAllUsers);
router.get('/user/:id', userController.getUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

router.get('/products',  productContrller.getproduct);
router.get('/products/:id', productContrller.getproducts);
router.put('/products/:id',  productContrller.updateproducts);
router.delete('/products/:id', productContrller.deleteproduct);
router.post('/products', productContrller.addproduct);

router.put('/cartproduct/:id',cartproduct.updatecartproducts);
router.delete('/cartproduct/:id',cartproduct.deletecartproducts);

router.post('/login',authController.getUser);
router.post('/register',authController.registerUser);


export = router;