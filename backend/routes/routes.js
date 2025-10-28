import express from "express";
import {
  addToCart,
  checkout,
  getCart,
  getProducts,
  removeFromCart,
  updateCart,
} from "../controllers/product-cart-controllers.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/cart", addToCart);
router.get("/cart", getCart);
router.put("/cart", updateCart);
router.delete("/cart/:id", removeFromCart);
router.post("/checkout", checkout);

export default router;
