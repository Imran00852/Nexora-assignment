import {
  ArrowBack,
  AssignmentTurnedIn,
  ShoppingCartCheckout,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCheckoutMutation, useGetCartQuery } from "../redux/api/api";

const steps = ["Cart Review", "Shipping Details", "Order Confirmation"];

const Checkout = () => {
  const navigate = useNavigate();
  const { data: cartData, isLoading: cartLoading } = useGetCartQuery();
  const [checkout, { isLoading: isCheckingOut }] = useCheckoutMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const cartItems = cartData?.cart?.items || [];
  const totalAmount = cartData?.cart?.totalAmount || 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(1);
    } else if (activeStep === 1) {
      if (validateForm()) {
        setActiveStep(2);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handlePlaceOrder = async () => {
    try {
      const result = await checkout(formData).unwrap();
      if (result.success) {
        toast.success("Order placed successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.data?.msg || "Failed to place order");
    }
  };

  if (cartLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center", mt: 8 }}>
        <CircularProgress size={60} />
        <Typography
          variant="h6"
          sx={{ mt: 2, fontFamily: '"Montserrat", sans-serif' }}
        >
          Loading checkout...
        </Typography>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
        <Alert
          severity="warning"
          sx={{ fontFamily: '"Montserrat", sans-serif', mb: 2 }}
        >
          Your cart is empty. Add some items to proceed with checkout.
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate("/")}
          sx={{ fontFamily: '"Montserrat", sans-serif' }}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/cart")}
          sx={{
            mb: 3,
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 600,
          }}
        >
          Back to Cart
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
          }}
        >
          Checkout
        </Typography>
      </Box>

      {/* Stepper */}
      <Box sx={{ mb: 6 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column - Form & Order Summary */}
        <Grid item xs={12} md={8}>
          {activeStep === 0 && (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  fontFamily='"Montserrat", sans-serif'
                  fontWeight={600}
                  gutterBottom
                >
                  Cart Review
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {cartItems.map((item) => (
                    <Box
                      key={item.productId || item._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        py: 1,
                      }}
                    >
                      <Typography fontFamily='"Montserrat", sans-serif'>
                        {item.productId?.name || item.name} × {item.quantity}
                      </Typography>
                      <Typography
                        fontFamily='"Montserrat", sans-serif'
                        fontWeight={600}
                      >
                        $
                        {(
                          (item.productId?.price || item.price) * item.quantity
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          )}

          {activeStep === 1 && (
            <Card>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h5"
                  fontFamily='"Montserrat", sans-serif'
                  fontWeight={600}
                  gutterBottom
                >
                  Shipping Information
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={{ fontFamily: '"Montserrat", sans-serif' }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{ fontFamily: '"Montserrat", sans-serif' }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          )}

          {activeStep === 2 && (
            <Card>
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <AssignmentTurnedIn
                  sx={{ fontSize: 80, color: "primary.main", mb: 3 }}
                />
                <Typography
                  variant="h4"
                  fontFamily='"Montserrat", sans-serif'
                  fontWeight={700}
                  gutterBottom
                >
                  Order Confirmation
                </Typography>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  fontFamily='"Montserrat", sans-serif'
                  sx={{ mb: 3 }}
                >
                  Review your order details before placing
                </Typography>

                <Box sx={{ textAlign: "left", maxWidth: 400, mx: "auto" }}>
                  <Typography
                    variant="h6"
                    fontFamily='"Montserrat", sans-serif'
                    fontWeight={600}
                    gutterBottom
                  >
                    Order Summary:
                  </Typography>
                  {cartItems.map((item) => (
                    <Box
                      key={item.productId || item._id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography fontFamily='"Montserrat", sans-serif'>
                        {item.productId?.name || item.name} × {item.quantity}
                      </Typography>
                      <Typography fontFamily='"Montserrat", sans-serif'>
                        $
                        {(
                          (item.productId?.price || item.price) * item.quantity
                        ).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="h6"
                      fontFamily='"Montserrat", sans-serif'
                      fontWeight={600}
                    >
                      Total:
                    </Typography>
                    <Typography
                      variant="h6"
                      fontFamily='"Montserrat", sans-serif'
                      fontWeight={600}
                    >
                      ${totalAmount.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: "sticky", top: 100 }}>
            <Typography
              variant="h5"
              fontFamily='"Montserrat", sans-serif'
              fontWeight={600}
              gutterBottom
            >
              Order Summary
            </Typography>

            <Box sx={{ mb: 2 }}>
              {cartItems.map((item) => (
                <Box
                  key={item.productId || item._id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontFamily='"Montserrat", sans-serif'
                  >
                    {item.productId?.name || item.name} × {item.quantity}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily='"Montserrat", sans-serif'
                  >
                    $
                    {(
                      (item.productId?.price || item.price) * item.quantity
                    ).toFixed(2)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography fontFamily='"Montserrat", sans-serif'>
                  Subtotal
                </Typography>
                <Typography fontFamily='"Montserrat", sans-serif'>
                  ${totalAmount.toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography fontFamily='"Montserrat", sans-serif'>
                  Shipping
                </Typography>
                <Typography fontFamily='"Montserrat", sans-serif'>
                  Free
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography fontFamily='"Montserrat", sans-serif'>
                  Tax
                </Typography>
                <Typography fontFamily='"Montserrat", sans-serif'>
                  $0.00
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography
                variant="h6"
                fontFamily='"Montserrat", sans-serif'
                fontWeight={700}
              >
                Total
              </Typography>
              <Typography
                variant="h6"
                fontFamily='"Montserrat", sans-serif'
                fontWeight={700}
              >
                ${totalAmount.toFixed(2)}
              </Typography>
            </Box>

            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
              {activeStep > 0 && (
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleBack}
                  disabled={isCheckingOut}
                  sx={{ fontFamily: '"Montserrat", sans-serif' }}
                >
                  Back
                </Button>
              )}

              {activeStep < steps.length - 1 ? (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleNext}
                  sx={{ fontFamily: '"Montserrat", sans-serif' }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={
                    isCheckingOut ? (
                      <CircularProgress size={20} />
                    ) : (
                      <ShoppingCartCheckout />
                    )
                  }
                  onClick={handlePlaceOrder}
                  disabled={isCheckingOut}
                  sx={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 700,
                    background:
                      "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  }}
                >
                  {isCheckingOut ? "Placing Order..." : "Place Order"}
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
