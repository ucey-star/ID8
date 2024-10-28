import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function Home() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #F7F7F8, #E3E7FF, #DCE0FF)",
        fontFamily: "Outfit, sans-serif",
        padding: "40px",
      }}
    >
      <Box sx={{ position: "absolute", top: 20, left: 20 }}>
        {/* todo: Insetr the logo here */}
      </Box>

      <Box sx={{ width: "100%", mb: 4 }}>
        {/* Placeholder for the Navigation component 
            todo: Insert the Navigation component here
        */}
      </Box>

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          alignItems: "center",
        }}
      >
        <Card />
        <Card />
      </Container>
    </Box>
  );
}

const Card = () => {
  
  const name = "Muhammad Saleh";
  const date = "December 06, 2024";
  const views = 123;
  const comments = 456;
  const likes = 789;

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "500px",
        backgroundColor: "#FFFFFF",
        padding: "32px",
        borderRadius: "16px",
        border: "1px solid #D6D6E7",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, color: "#333", fontFamily: "Outfit, sans-serif" }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#6C6C80",
            fontSize: "16px",
            lineHeight: "20.16px",
            fontFamily: "Outfit, sans-serif",
          }}
        >
          {date}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "400px",
          height: "400px",
          backgroundColor: "#F0F0F5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{
            color: "#6C6C80",
            fontSize: "16px",
            fontWeight: 400,
            fontFamily: "Outfit, sans-serif",
          }}
        >
          Name or Logo or Demo
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center", display: "flex", alignItems: "center", gap: "8px" }}>
          <VisibilityOutlinedIcon sx={{ color: "#000000", fontSize: "36px" }} />
          <Typography sx={{ fontSize: "14px", color: "#333", fontFamily: "Outfit, sans-serif" }}>
            {views}
          </Typography>
        </Box>
        <Box sx={{ width: "1px", backgroundColor: "#D6D6E7", height: "48px" }} />

        <Box sx={{ textAlign: "center", display: "flex", alignItems: "center", gap: "8px" }}>
          <ModeCommentOutlinedIcon sx={{ color: "#000000", fontSize: "36px" }} />
          <Typography sx={{ fontSize: "14px", color: "#333", fontFamily: "Outfit, sans-serif" }}>
            {comments}
          </Typography>
        </Box>
        <Box sx={{ width: "1px", backgroundColor: "#D6D6E7", height: "48px" }} />

        <Box sx={{ textAlign: "center", display: "flex", alignItems: "center", gap: "8px" }}>
          <FavoriteBorderOutlinedIcon sx={{ color: "#000000", fontSize: "36px" }} />
          <Typography sx={{ fontSize: "14px", color: "#333", fontFamily: "Outfit, sans-serif" }}>
            {likes}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        className="custom-next-button"
        sx={{
          width: "fit-content",
          minWidth: 120,
          padding: "8px 16px",
          whiteSpace: "nowrap",
          flexShrink: 0,
          fontFamily: "Outfit, sans-serif",
        }}
      >
        Explore More
      </Button>
    </Box>
  );
};
