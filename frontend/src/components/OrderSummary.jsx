import { ShoppingCartCheckout } from "@mui/icons-material";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";

const OrderSummary = ({ cartItems, totalAmount, onCheckout }) => {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        maxWidth: 500,
        width: "100%",
      }}
    >
      <Typography
        variant="h5"
        fontFamily='"Montserrat", sans-serif'
        fontWeight={700}
        gutterBottom
        sx={{
          textAlign: "center",
          fontSize: { xs: "1.5rem", md: "1.8rem" },
        }}
      >
        Order Summary
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            py: 1,
          }}
        >
          <Typography
            variant="body1"
            fontFamily='"Montserrat", sans-serif'
            fontWeight={600}
            sx={{ fontSize: "0.95rem" }}
          >
            Subtotal (
            {cartItems.reduce((total, item) => total + item.quantity, 0)} items)
          </Typography>
          <Typography
            variant="body1"
            fontFamily='"Montserrat", sans-serif'
            fontWeight={600}
            sx={{ fontSize: "0.95rem" }}
          >
            ${totalAmount.toFixed(2)}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            py: 1,
          }}
        >
          <Typography
            variant="body1"
            fontFamily='"Montserrat", sans-serif'
            fontWeight={600}
            sx={{ fontSize: "0.95rem" }}
          >
            Shipping
          </Typography>
          <Typography
            variant="body1"
            fontFamily='"Montserrat", sans-serif'
            fontWeight={600}
            sx={{ fontSize: "0.95rem" }}
          >
            Free
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            py: 1,
          }}
        >
          <Typography
            variant="body1"
            fontFamily='"Montserrat", sans-serif'
            fontWeight={600}
            sx={{ fontSize: "0.95rem" }}
          >
            Tax
          </Typography>
          <Typography
            variant="body1"
            fontFamily='"Montserrat", sans-serif'
            fontWeight={600}
            sx={{ fontSize: "0.95rem" }}
          >
            $0.00
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.3)" }} />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          fontFamily='"Montserrat", sans-serif'
          fontWeight={800}
          sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" } }}
        >
          Total
        </Typography>
        <Typography
          variant="h5"
          fontFamily='"Montserrat", sans-serif'
          fontWeight={800}
          sx={{ fontSize: { xs: "1.3rem", md: "1.5rem" } }}
        >
          ${totalAmount.toFixed(2)}
        </Typography>
      </Box>

      <Button
        variant="contained"
        fullWidth
        size="large"
        startIcon={<ShoppingCartCheckout />}
        onClick={onCheckout}
        sx={{
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 700,
          py: 1.5,
          fontSize: "1rem",
          backgroundColor: "white",
          color: "primary.main",
          borderRadius: 2,
          boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
          "&:hover": {
            backgroundColor: "grey.100",
            transform: "translateY(-2px)",
            boxShadow: "0 12px 35px rgba(0,0,0,0.3)",
          },
          transition: "all 0.3s ease",
        }}
      >
        Proceed to Checkout
      </Button>
    </Paper>
  );
};

export default OrderSummary;
