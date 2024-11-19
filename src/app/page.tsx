"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                background: "linear-gradient(to right, #f8f9fc, #e3e7ff)",
                padding: "20px",
            }}
        >
            <Box
                sx={{
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    padding: "40px",
                    width: "100%",
                    maxWidth: "500px",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: "bold",
                        marginBottom: "16px",
                        color: "#333",
                        fontFamily: "Arial, sans-serif",
                    }}
                >
                    Welcome to the Platform
                </Typography>
                <Typography
                    sx={{
                        fontSize: "16px",
                        marginBottom: "24px",
                        color: "#666",
                        fontFamily: "Arial, sans-serif",
                    }}
                >
                    Follow these steps to get started:
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                        alignItems: "center",
                        fontFamily: "Arial, sans-serif",
                    }}
                >
                    {/* Step 1 */}
                    <Box sx={{ textAlign: "left", width: "100%" }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                marginBottom: "8px",
                                color: "#333",
                            }}
                        >
                            Step 1: Complete Your Profile
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                marginBottom: "12px",
                                color: "#666",
                            }}
                        >
                            Make sure others can understand who you are by completing your profile.
                        </Typography>
                        <Link href={{
                                pathname: "/personal-details",
                                query: { step: "complete-profile" },
                            }}
							 passHref>
                            <Button
                                variant="contained"
                                sx={{
                                    background: "linear-gradient(90deg, #7b42f6, #bc85f9)",
                                    color: "white",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    fontWeight: "bold",
                                }}
                            >
                                Complete Profile
                            </Button>
                        </Link>
                    </Box>

                    {/* Step 2 */}
                    <Box sx={{ textAlign: "left", width: "100%" }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                marginBottom: "8px",
                                color: "#333",
                            }}
                        >
                            Step 2: Share Your Project Idea
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                marginBottom: "12px",
                                color: "#666",
                            }}
                        >
                            Submit your project idea to start connecting with others.
                        </Typography>
                        <Link
                            href={{
                                pathname: "/project_idea",
                                query: { step: "start-project" },
                            }}
                            passHref
                        >
                            <Button
                                variant="contained"
                                sx={{
                                    background: "linear-gradient(90deg, #34c759, #62e3a6)",
                                    color: "white",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    fontWeight: "bold",
                                }}
                            >
                                Start a Project
                            </Button>
                        </Link>
                    </Box>

                    {/* Step 3 */}
                    <Box sx={{ textAlign: "left", width: "100%" }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                marginBottom: "8px",
                                color: "#333",
                            }}
                        >
                            Step 3: Go to Your Dashboard
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "14px",
                                marginBottom: "12px",
                                color: "#666",
                            }}
                        >
                            View your progress and manage your projects on the dashboard.
                        </Typography>
                        <Link href="/home" passHref>
                            <Button
                                variant="contained"
                                sx={{
                                    background: "linear-gradient(90deg, #ff9900, #ffc14c)",
                                    color: "white",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    fontWeight: "bold",
                                }}
                            >
                                Go to Dashboard
                            </Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
