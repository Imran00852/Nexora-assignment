import { AddShoppingCart } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  CircularProgress,
} from "@mui/material";

const ProductCard = ({ product, onAddToCart, isAddingToCart }) => {
  const { _id, name, price, image, ratings, category } = product;

  const rating = ratings?.rate || 0;
  const reviews = ratings?.count || 0;

  return (
    <Card
      sx={{
        width: "380px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Product Image - Fixed height container */}
      <Box
        sx={{
          position: "relative",
          height: "250px",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />

        {/* Category Chip */}
        <Chip
          label={category?.charAt(0).toUpperCase() + category?.slice(1)}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
            fontSize: "0.7rem",
          }}
        />
      </Box>

      {/* Card Content - Fixed height with proper spacing */}
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 2,
          height: "250px",
          gap: 1,
        }}
      >
        {/* Product Name - Fixed height container */}
        <Box
          sx={{
            minHeight: "48px",
            maxHeight: "48px",
            overflow: "hidden",
            mb: 1,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            fontFamily='"Montserrat", sans-serif'
            fontWeight={600}
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.2,
              fontSize: "0.95rem",
            }}
          >
            {name}
          </Typography>
        </Box>

        {/* Rating - Fixed height */}
        <Box sx={{ height: "20px", mb: 1 }}>
          <Typography
            variant="body2"
            color="text.secondary"
            fontFamily='"Montserrat", sans-serif'
            sx={{ fontSize: "0.8rem" }}
          >
            ⭐ {rating} ({reviews} reviews)
          </Typography>
        </Box>

        {/* Price - Fixed height */}
        <Box sx={{ height: "32px", mb: 2 }}>
          <Typography
            variant="h5"
            color="primary"
            fontFamily='"Montserrat", sans-serif'
            fontWeight={700}
          >
            ${price}
          </Typography>
        </Box>

        {/* Add to Cart Button - Fixed at bottom */}
        <Box sx={{ mt: "auto" }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={
              isAddingToCart ? (
                <CircularProgress size={16} />
              ) : (
                <AddShoppingCart />
              )
            }
            onClick={() => onAddToCart(product)}
            disabled={isAddingToCart}
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 600,
              py: 1,
              borderRadius: 1,
              textTransform: "none",
              fontSize: "0.9rem",
            }}
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
