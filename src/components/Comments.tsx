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
				gap: "var(--spacing-small)",
			}}
		>
			<ModeCommentOutlinedIcon sx={{ color: "var(--color-text-primary)", fontSize: "36px" }} />
			<Typography
				sx={{
					fontSize: "14px",
					color: "var(--color-text-primary)",
					fontFamily: "var(--font-family-outfit)",
				}}
			>
				{comments}
			</Typography>
		</Box>
	);
};

export default Comments;
