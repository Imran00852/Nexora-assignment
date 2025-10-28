import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Alert,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "../redux/api/api";
import toast from "react-hot-toast";

import CartHeader from "../components/CartHeader";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import EmptyCart from "../components/EmptyCart";

const Cart = () => {
  const navigate = useNavigate();
  const {
    data: cartData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const result = await updateCart({
        productId,
        quantity: newQuantity,
      }).unwrap();
      if (result.success) {
        toast.success("Cart updated successfully!");
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.msg || "Failed to update cart");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const result = await removeFromCart(productId).unwrap();
      if (result.success) {
        toast.success("Item removed from cart!");
        refetch();
      }
    } catch (error) {
      toast.error(error?.data?.msg || "Failed to remove item");
    }
  };

  const handleCheckout = () => navigate("/checkout");

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center", mt: 8 }}>
        <CircularProgress size={60} />
        <Typography
          variant="h6"
          sx={{ mt: 2, fontFamily: '"Montserrat", sans-serif' }}
        >
          Loading your cart...
        </Typography>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
        <Alert severity="error" sx={{ fontFamily: '"Montserrat", sans-serif' }}>
          {error?.data?.msg || "Failed to load cart"}
        </Alert>
        <Button
          variant="contained"
          sx={{ mt: 2, fontFamily: '"Montserrat", sans-serif' }}
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  const cartItems = cartData?.cart?.items || [];
  const totalAmount = cartData?.cart?.totalAmount || 0;

  return (
    <Container maxWidth="xl" sx={{ py: 4, mt: 8 }}>
      <CartHeader itemCount={cartItems.length} />

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} lg={8}>
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.productId || item._id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </Box>
          )}
        </Grid>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <Grid item xs={12} lg={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <OrderSummary
                cartItems={cartItems}
                totalAmount={totalAmount}
                onCheckout={handleCheckout}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Cart;
