"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import supabaseClient from "~/api/supabaseConfig";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Stack,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Image from "next/image";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");

  // Function to handle Google Sign-in
  const signInWithGoogle = async (): Promise<void> => {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.log("Error logging in with Google:", error.message);
  };

  // Function to handle email login
  const handleEmailLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const { error } = await supabaseClient.auth.signInWithOtp({ email });
    if (error) console.log("Error sending magic link:", error.message);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(90deg, #F7F7F8 10%, #E8EBFF 30%, #E1E5FF 50%, rgba(255, 255, 255, 0.6) 80%, rgba(255, 255, 255, 0.9) 100%)",
        padding: "70px",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "#fff", // Solid white background for the login card
          padding: "40px",
          borderRadius: "16px", // More rounded edges
          textAlign: "center",
          width: "100%",
          maxWidth: "450px", // Slightly increased size
          border: "1px solid #D3BFFF", // Subtle purple border
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Slight shadow for better aesthetics
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
            paddingBottom: "24px",
          }}
        >
          <Image
            src="../ID8_logo.svg" // Path to your logo in the public folder
            alt="Company Logo"
            width={100} // Set appropriate width for the image
            height={100} // Set appropriate height for the image
          />
        </Box>

        <Typography variant="h5" sx={{ mb: 2 }}>
          Enter your email
        </Typography>
        <Stack spacing={2}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            fullWidth
            onClick={signInWithGoogle}
            sx={{
              textTransform: "none",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px", // Adjust this value for more or less rounding
              },
            }}
          >
            Continue with Google
          </Button>

          <Typography variant="body1" sx={{ color: "gray" }}>
            OR
          </Typography>

          <form onSubmit={handleEmailLogin}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                mb: 4,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px", // Adjust this value for more or less rounding
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                background: "linear-gradient(45deg, #6A5BFF, #914FEF)",
                color: "#fff",
              }}
            >
              Continue
            </Button>
          </form>
        </Stack>
      </Container>
    </Box>
  );
};

export default Login;
