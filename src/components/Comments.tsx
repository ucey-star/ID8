"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";

const Comments = ({ comments }: { comments: number }) => {
	return (
		<Box
			sx={{
				textAlign: "center",
				display: "flex",
				alignItems: "center",
				gap: "8px",
			}}
		>
			<ModeCommentOutlinedIcon sx={{ color: "#000000", fontSize: "36px" }} />
			<Typography
				sx={{
					fontSize: "14px",
					color: "#333",
					fontFamily: "Outfit, sans-serif",
				}}
			>
				{comments}
			</Typography>
		</Box>
	);
};

export default Comments;
