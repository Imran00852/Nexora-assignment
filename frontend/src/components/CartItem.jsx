import { Add, Remove, Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          {/* Product Image */}
          <Grid item xs={12} sm={3}>
            <Box
              component="img"
              src={item?.image}
              alt={item?.name}
              sx={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} sm={4}>
            <Box>
              <Chip
                label={item?.category}
                size="small"
                sx={{
                  mb: 1,
                  fontFamily: '"Montserrat", sans-serif',
                  fontWeight: 600,
                  backgroundColor: "primary.light",
                  color: "white",
                  fontSize: "0.7rem",
                }}
              />
              <Typography
                variant="h6"
                fontFamily='"Montserrat", sans-serif'
                fontWeight={600}
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: 1.3,
                  mb: 1,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                {item?.name}
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                fontFamily='"Montserrat", sans-serif'
                fontWeight={700}
                sx={{
                  mt: 1,
                  fontSize: { xs: "1.2rem", sm: "1.4rem" },
                }}
              >
                ${item?.price}
              </Typography>
            </Box>
          </Grid>

          {/* Quantity Controls */}
          <Grid item xs={12} sm={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                bgcolor: "grey.50",
                borderRadius: 2,
                py: 1,
                px: 1,
              }}
            >
              <IconButton
                onClick={() =>
                  onQuantityChange(item.productId, item.quantity - 1)
                }
                disabled={item.quantity <= 1}
                sx={{
                  backgroundColor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "grey.100",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Remove />
              </IconButton>
              <Typography
                variant="h6"
                fontFamily='"Montserrat", sans-serif'
                sx={{
                  minWidth: 40,
                  textAlign: "center",
                  fontWeight: 700,
                  color: "primary.main",
                  fontSize: "1.1rem",
                }}
              >
                {item.quantity}
              </Typography>
              <IconButton
                onClick={() =>
                  onQuantityChange(item.productId, item.quantity + 1)
                }
                sx={{
                  backgroundColor: "white",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "grey.100",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Add />
              </IconButton>
            </Box>
          </Grid>

          {/* Remove Button and Item Total */}
          <Grid item xs={12} sm={2}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Typography
                variant="h5"
                fontFamily='"Montserrat", sans-serif'
                fontWeight={700}
                sx={{
                  background:
                    "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontSize: { xs: "1.2rem", sm: "1.4rem" },
                }}
              >
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
              <IconButton
                color="error"
                onClick={() => onRemove(item.productId)}
                sx={{
                  backgroundColor: "error.light",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "error.main",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;
