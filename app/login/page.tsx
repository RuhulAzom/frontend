"use client";

import type React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Link,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { userApi } from "../../api/userApi";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";

export default function LoginPage() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login attempt with:", { email, password });
    setIsLoading(true);
    try {
      const res = await userApi.login(email, password);
      Cookies.set("token", res.data.data.token);
      toast.success(res.data.message || "Berhasil Login");
      window.location.href = "/";
    } catch (error) {
      toast.error((error as any).response.data.message || "Gagal Login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 3,
              color: theme.palette.secondary.main,
              fontWeight: "bold",
            }}
          >
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 1, width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
              }}
              endIcon={isLoading ? null : <LoginIcon />}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" style={{ color: "white" }} />
              ) : (
                "Sign In"
              )}
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 2,
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center",
              }}
            >
              <Link
                href="/register"
                variant="body2"
                sx={{
                  color: theme.palette.secondary.main,
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
