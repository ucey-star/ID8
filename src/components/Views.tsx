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
				gap: "var(--spacing-small)",
			}}
		>
			<VisibilityOutlinedIcon sx={{ color: "var(--color-text-primary)", fontSize: "36px" }} />
			<Typography
				sx={{
					fontSize: "14px",
					color: "var(--color-text-primary)",
					fontFamily: "var(--font-family-outfit)",
				}}
			>
				{views}
			</Typography>
		</Box>
	);
};

export default Views;