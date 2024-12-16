import React from "react";
import { createClient } from "~/api/supabaseServerClient";
import Navbar from "~/components/Navbar";
import { Box } from "@mui/material";
import MyProjectsContent from "~/components/MyProjectsContent";
import { Typography } from "@mui/material";


export default async function MyProjectsPage() {
    const supabaseServer = await createClient();

    const {
        data: { user },
    } = await supabaseServer.auth.getUser();

    if (!user) {
        return (
            <>
                {/* Fixed Navbar */}
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        zIndex: 1000,
                        background: "var(--color-background-primary)",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        height: "90px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Navbar />
                </Box>

                {/* Centered Message for Logged Out Users */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                        paddingTop: "90px", 
                    }}
                >
                    <Typography variant="h5">
                        You need to log in to view your projects.
                    </Typography>
                </Box>
            </>
        );
    }

    return (
        <>
            {/* Fixed Navbar */}
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 1000,
                    background: "var(--color-background-primary)",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    height: "90px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Navbar />
            </Box>

            {/* Main Content */}
            <Box
                sx={{
                    minHeight: "100vh",
                    paddingTop: "90px", 
                    background:
                        "linear-gradient(135deg, var(--color-background-primary), #E3E7FF, #DCE0FF)", 
                }}
            >
                <MyProjectsContent userId={user.id} />
            </Box>
        </>
    );
}
