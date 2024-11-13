"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

interface FeedbackItemProps {
	name: string;
	timeAgo: string;
	feedback: string;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({
	name,
	timeAgo,
	feedback,
}) => {
	return (
		<Box sx={{ width: "100%", marginBottom: "var(--spacing-small)" }}>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography
					sx={{
						fontWeight: "var(--font-weight-bold)",
						fontSize: "18px",
						fontFamily: "var(--font-family-outfit)",
					}}
				>
					{name}
				</Typography>
				<Typography
					sx={{
						color: "#C1C1C1",
						fontSize: "14px",
						fontFamily: "var(--font-family-outfit)",
						whiteSpace: "nowrap",
					}}
				>
					{timeAgo}
				</Typography>
			</Box>

			<Typography
				sx={{
					color: "#807F7F",
					fontSize: "16px",
					fontFamily: "var(--font-family-outfit)",
					marginTop: "4px",
				}}
			>
				{feedback}
			</Typography>
		</Box>
	);
};

export default FeedbackItem;
