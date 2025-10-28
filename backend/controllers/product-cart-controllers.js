import { Cart } from "../models/cart.js";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    const transformedProducts = products.map((p) => ({
      _id: p._id,
      name: p.title,
      price: p.price,
      image: p.image,
      ratings: {
        rate: p.rating.rate,
        count: p.rating.count,
      },
      category: p.category,
    }));
    res.status(200).json({
      success: true,
      products: transformedProducts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Internal Server Error!",
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        msg: "Product Id and Quantity are required!",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        msg: "Product not found!",
      });
    }

    const userId = "guest";

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
        totalAmount: product.price * quantity,
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      //recalculate total
      const populatedItems = await Promise.all(
        cart.items.map(async (item) => {
          const p = await Product.findById(item.productId);
          return p.price * item.quantity;
        })
      );

      cart.totalAmount = populatedItems.reduce((a, b) => a + b, 0);
    }
    await cart.save();
    res.status(200).json({
      success: true,
      msg: "Item added to cart successfully!",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Internal Server Error!",
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; //product id
    if (!id) {
      return res.status(400).json({
        success: false,
        msg: "Product Id is required!",
      });
    }
    const userId = "guest";
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        success: false,
        msg: "Cart not found!",
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === id
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        msg: "Item not found in cart!",
      });
    }
    // Remove the item
    cart.items.splice(itemIndex, 1);

    // Recalculate total
    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const p = await Product.findById(item.productId);
        return p.price * item.quantity;
      })
    );

    cart.totalAmount =
      populatedItems.length > 0 ? populatedItems.reduce((a, b) => a + b, 0) : 0;

    await cart.save();

    res.status(200).json({
      success: true,
      msg: "Item removed successfully!",
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Internal Server Error!",
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = "guest";

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        msg: "Cart not found!",
      });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) {
      return res.status(404).json({
        success: false,
        msg: "Item not found in cart!",
      });
    }

    item.quantity = quantity;

    // Recalculate total
    const populatedItems = await Promise.all(
      cart.items.map(async (item) => {
        const product = await Product.findById(item.productId);
        return product.price * item.quantity;
      })
    );

    cart.totalAmount = populatedItems.reduce((a, b) => a + b, 0);

    await cart.save();

    // Return populated cart
    const updatedCart = await Cart.findOne({ userId }).populate(
      "items.productId"
    );

    res.status(200).json({
      success: true,
      msg: "Cart updated successfully!",
      cart: updatedCart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Internal Server Error!",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userId = "guest";
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, msg: "Cart not found!" });
    }

    const detailedItems = await Promise.all(
      cart.items.map(async (item) => {
        const p = await Product.findById(item.productId);
        return {
          productId: p._id,
          name: p.title,
          price: p.price,
          quantity: item.quantity,
          image: p.image,
          category: p.category,
        };
      })
    );

    res.status(200).json({
      success: true,
      cart: {
        items: detailedItems,
        totalAmount: cart.totalAmount,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Internal Server Error!",
    });
  }
};

export const checkout = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = "guest";

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "Your cart is empty!",
      });
    }

    const newOrder = new Order({
      userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      name,
      email,
    });

    await newOrder.save();

    // clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save();

    res.status(200).json({
      success: true,
      msg: "Order placed successfully!",
      order: newOrder,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message || "Internal Server Error!",
    });
  }
};
