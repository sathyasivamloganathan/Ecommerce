import express from 'express'
import {registerController, loginController, testController, forgetPasswordController, updateProfileController, getorderController, allOrderController, orderStatusController} from '../controller/authController.js'
import { requireSignIn, isAdmin } from '../middlewares/authmiddleware.js';

const router = express.Router();
router.post('/register', registerController)

router.post('/login', loginController)

router.post('/forget-password', forgetPasswordController)

router.get('/test', requireSignIn, isAdmin, testController)

//protected route
router.get('/user-auth', requireSignIn, (req,res) => {
    res.status(200).send({ok: true})
})

router.get('/admin-auth', requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ok: true})
})

router.put('/profile', requireSignIn, updateProfileController)

router.get('/orders', requireSignIn, getorderController)

router.get('/all-orders', requireSignIn, isAdmin, allOrderController)

router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)


export default router