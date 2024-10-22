import React from "react";
import { Button } from "@mui/material";

const GradientButton: React.FC<{ content: string }> = ({ content }) => {
	return (
		<Button
			sx={{
				width: "100%",
				fontFamily: "Outfit",
				marginBottom: "12px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				borderRadius: "6px",
				background: "linear-gradient(to right, #5370F7, #8E54E9)",
				px: 2,
				py: 1,
				fontWeight: 600,
				color: "white",
				textTransform: "none",
				transition: "background 300ms",
				"&:hover": {
					background: "linear-gradient(to right, #4d65ce, #874ae8)",
				},
			}}
		>
			{content}
		</Button>
	);
};

export default GradientButton;
