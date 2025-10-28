import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery, useAddToCartMutation } from "../redux/api/api";
import toast from "react-hot-toast";

const AllProducts = () => {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

  const handleAddToCart = async (product) => {
    try {
      const result = await addToCart({
        productId: product._id,
        quantity: 1,
      }).unwrap();

      if (result.success) {
        toast.success(`${product.name} added to cart!`);
      }
    } catch (error) {
      toast.error(error?.data?.msg || "Failed to add item to cart");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.msg || "Failed to load products");
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress size={60} thickness={4} />
        <Typography
          variant="h6"
          sx={{ mt: 2, fontFamily: '"Montserrat!important", sans-serif' }}
        >
          Loading Premium Collection...
        </Typography>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ fontFamily: '"Montserrat", sans-serif' }}>
          {error?.data?.msg ||
            "Failed to load products. Please try again later."}
        </Alert>
      </Container>
    );
  }

  const products = data?.products || [];

  return (
    <Container maxWidth="xl" sx={{ py: 6 }}>
      {/* Header Section */}
      <Box
        sx={{
          mb: 6,
          textAlign: "center",
          display: { xs: "none", lg: "unset" },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          fontFamily='"Montserrat", sans-serif'
          fontWeight={800}
          gutterBottom
          sx={{
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            mt: { lg: "3rem", md: "2rem" },
          }}
        >
          Premium Collection
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          fontFamily='"Montserrat", sans-serif'
          fontWeight={400}
          sx={{
            fontSize: { xs: "1.1rem", md: "1.5rem" },
          }}
        >
          {products.length} curated products for the modern lifestyle
        </Typography>
      </Box>

      {/* Products Grid */}
      {products.length > 0 ? (
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                isAddingToCart={isAddingToCart}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography
            variant="h5"
            color="text.secondary"
            fontFamily='"Montserrat", sans-serif'
          >
            No products found. Please check back later.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default AllProducts;
