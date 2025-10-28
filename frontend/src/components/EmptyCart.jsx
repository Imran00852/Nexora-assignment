import { ShoppingCart } from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        textAlign: "center",
        py: 8,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        borderRadius: 3,
      }}
    >
      <ShoppingCart
        sx={{
          fontSize: 80,
          color: "primary.main",
          mb: 3,
          opacity: 0.7,
        }}
      />
      <Typography
        variant="h4"
        fontFamily='"Montserrat", sans-serif'
        fontWeight={700}
        gutterBottom
        sx={{
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontSize: { xs: "1.8rem", md: "2.2rem" },
        }}
      >
        Your Cart is Empty
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        fontFamily='"Montserrat", sans-serif'
        sx={{ mb: 4, maxWidth: 400, mx: "auto" }}
      >
        Discover amazing products and add them to your cart
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/")}
        sx={{
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 600,
          px: 4,
          py: 1.5,
          fontSize: "1rem",
          background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          boxShadow: "0 4px 15px rgba(33, 150, 243, 0.3)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(33, 150, 243, 0.4)",
          },
          transition: "all 0.3s ease",
        }}
      >
        Start Shopping
      </Button>
    </Card>
  );
};

export default EmptyCart;
