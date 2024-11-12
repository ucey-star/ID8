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
