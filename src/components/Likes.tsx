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
				gap: "8px",
			}}
		>
			<FavoriteBorderOutlinedIcon sx={{ color: "#000000", fontSize: "36px" }} />
			<Typography
				sx={{
					fontSize: "14px",
					color: "#333",
					fontFamily: "Outfit, sans-serif",
				}}
			>
				{likes}
			</Typography>
		</Box>
	);
};

export default Likes;
