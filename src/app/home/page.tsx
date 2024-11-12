import React from "react";
import { Box, Container } from "@mui/material";
import Card from "../../components/Card";

export default function Home() {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				background: "linear-gradient(135deg, var(--color-background-primary), #E3E7FF, #DCE0FF)",
				fontFamily: "var(--font-family-outfit)",
				padding: "var(--spacing-large)",
			}}
		>
			<Box sx={{ position: "absolute", top: "20px", left: "20px" }}>
				{/* todo: Insert the logo here */}
			</Box>

			<Box sx={{ width: "100%", mb: "var(--spacing-medium)" }}>
				{/* Placeholder for the Navigation component 
            todo: Insert the Navigation component here
        */}
			</Box>

			<Container
				maxWidth="md"
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-medium)",
					alignItems: "center",
				}}
			>
				<Card />
				<Card />
			</Container>
		</Box>
	);
}
