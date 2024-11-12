"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Likes = ({ likes }: { likes: number }) => {
	return (
		<Box
			sx={{
				textAlign: "center",
				display: "flex",
				alignItems: "center",
				gap: "var(--spacing-small)",
			}}
		>
			<FavoriteBorderOutlinedIcon sx={{ color: "var(--color-text-primary)", fontSize: "36px" }} />
			<Typography
				sx={{
					fontSize: "14px",
					color: "var(--color-text-primary)",
					fontFamily: "var(--font-family-outfit)",
				}}
			>
				{likes}
			</Typography>
		</Box>
	);
};

export default Likes;
