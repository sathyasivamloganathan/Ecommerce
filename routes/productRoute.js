import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authmiddleware.js";
import { createProductController, getProductController, singleProductController, productPhotoController, deleteProductController, updateProductController, productsFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, brainreeTokenController, braintreePaymentController } from "../controller/productController.js";
import formidable from "express-formidable"

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)
router.get('/get-product', getProductController)
router.get('/get-product/:slug', singleProductController)
router.get('/product-photo/:pid', productPhotoController)
router.delete('/delete-product/:pid', deleteProductController)

router.post('/product-filters', productsFilterController)
router.get('/product-count', productCountController)
router.get('/product-list/:page', productListController)

router.get('/search/:keyword', searchProductController)
router.get('/related-product/:pid/:cid', relatedProductController)

router.get('/product-category/:slug', productCategoryController)

router.get('/braintree/token', brainreeTokenController)

router.post('/braintree/payment', requireSignIn, braintreePaymentController)

export default router;