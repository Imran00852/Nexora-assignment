import mongoose from "mongoose";
import axios from "axios";
import { Product } from "../models/product.js";
import { config } from "dotenv";

config({
  path: "../.env",
});

const addProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "EcomDB" });

    const { data } = await axios.get("https://fakestoreapi.com/products");

    await Product.insertMany(data);
    console.log(`${data.length} products added successfully!`);
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

addProducts();
