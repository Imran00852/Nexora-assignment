import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGetCartQuery } from "../redux/api/api";

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const { data: cartData } = useGetCartQuery();

  const cartItemCount = cartData?.cart?.items?.length || 0;

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/" },
    { label: "About", href: "/" },
  ];

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "text.primary",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            {/* Logo with Link */}
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 700,
                color: "primary.main",
                textDecoration: "none",
                flexShrink: 0,
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              VibeCart
            </Typography>

            {/* Desktop Navigation with Links */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.href}
                  sx={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 500,
                    color: "text.primary",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>

            {/* Right Section */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Cart Icon with Badge */}
              <IconButton
                component={Link}
                to="/cart"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <Badge
                  badgeContent={cartItemCount}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontFamily: '"Montserrat", sans-serif',
                      fontWeight: 600,
                    },
                  }}
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
