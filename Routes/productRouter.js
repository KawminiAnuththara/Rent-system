import express from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct, viewProducts } from '../Controllers/productController.js';

const productRouter = express.Router();

productRouter.post("/",addProduct);

productRouter.get("/",getProducts);

productRouter.put("/:key",updateProduct);

productRouter.delete('/:key',deleteProduct);

productRouter.get("/:key",viewProducts);


export default productRouter;