"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import useMobile from "~/utils/useMobile";

const AddProjectCard: React.FC = () => {
    const router = useRouter();
    const isMobile = useMobile();

    return (
        <Box
            onClick={() => router.push("/new_project_idea")}
            sx={{
                width: `${isMobile ? "90%" : "65%"}`, 
                minHeight: "200px",
                backgroundColor: "#F3F4F6", 
                border: "2px dashed #4F46E5", 
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "0 auto",
                textAlign: "center",
                fontFamily: "var(--font-family-outfit)",
                color: "#4F46E5", 
                fontWeight: "600",
                fontSize: "1.25rem",
                transition: "transform 0.2s, background-color 0.2s",
                cursor: "pointer",
                "&:hover": {
                    transform: "scale(1.02)",
                    backgroundColor: "#EDEFF6", 
                },
            }}
        >
            <Typography
                variant="h3"
                sx={{ fontWeight: "bold", marginBottom: "8px", color: "#4F46E5" }}
            >
                +
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    fontWeight: "600",
                    fontSize: "1rem",
                    color: "#4F46E5",
                }}
            >
                Add a Project
            </Typography>
        </Box>
    );
};

export default AddProjectCard;
