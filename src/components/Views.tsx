"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const Views = ({ views }: { views: number }) => {
	return (
		<Box
			sx={{
				textAlign: "center",
				display: "flex",
				alignItems: "center",
				gap: "8px",
			}}
		>
			<VisibilityOutlinedIcon sx={{ color: "#000000", fontSize: "36px" }} />
			<Typography
				sx={{
					fontSize: "14px",
					color: "#333",
					fontFamily: "Outfit, sans-serif",
				}}
			>
				{views}
			</Typography>
		</Box>
	);
};

export default Views;
