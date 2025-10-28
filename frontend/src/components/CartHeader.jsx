import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartHeader = ({ itemCount }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 6 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigate("/")}
        sx={{
          mb: 3,
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          color: "primary.main",
        }}
      >
        Continue Shopping
      </Button>
      <Typography
        variant="h3"
        component="h1"
        fontFamily='"Montserrat", sans-serif'
        fontWeight={700}
        gutterBottom
        sx={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontSize: { xs: "2rem", md: "2.5rem" },
        }}
      >
        Shopping Cart
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        fontFamily='"Montserrat", sans-serif'
        fontWeight={400}
        sx={{
          fontSize: { xs: "1rem", md: "1.2rem" },
        }}
      >
        {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
      </Typography>
    </Box>
  );
};

export default CartHeader;
