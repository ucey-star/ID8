"use client";
import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import Views from "./Views";
import Comments from "./Comments";
import Likes from "./Likes";
import FeedbackItem from "./FeedbackItem";

interface FeedbackData {
	id: number;
	name: string;
	timeAgo: string;
	feedback: string;
}

interface FeedbackProps {
	data: FeedbackData[];
}

const Feedback: React.FC<FeedbackProps> = ({
	data,
}) => {
	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: "500px",
				backgroundColor: "var(--color-background-paper)",
				padding: "var(--spacing-large)",
				borderRadius: "16px",
				border: `1px solid var(--color-border)`,
				boxShadow: "var(--box-shadow)",
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-medium)",
				alignItems: "center",
				fontFamily: "var(--font-family-outfit)",
			}}
		>
			<Typography
				sx={{
					fontFamily: "var(--font-family-outfit)",
					fontSize: "28px",
					fontWeight: 600,
					lineHeight: "36px",
					textAlign: "center",
					color: "var(--color-text-primary)",
					marginBottom: "var(--spacing-large)",
				}}
			>
				Feedback
			</Typography>

			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					marginBottom: "var(--spacing-large)",
				}}
			>
				<Box
					sx={{
						width: "1px",
						backgroundColor: "var(--color-border)",
						height: "48px",
					}}
				/>
				<Box
					sx={{
						width: "1px",
						backgroundColor: "var(--color-border)",
						height: "48px",
					}}
				/>
			</Box>

			<Box
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-small)",
				}}
			>
				{data.map((item) => (
					<FeedbackItem
						key={item.id}
						name={item.name}
						timeAgo={item.timeAgo}
						feedback={item.feedback}
					/>
				))}
			</Box>

			<TextField
				placeholder="Add a comment"
				variant="outlined"
				fullWidth
				sx={{
					fontFamily: "var(--font-family-outfit)",
					fontSize: "16px",
					marginBottom: "var(--spacing-small)",
				}}
			/>

			<Button
				variant="contained"
				className="custom-next-button"
				sx={{
					width: "fit-content",
					minWidth: "120px",
					padding: "var(--spacing-small) var(--spacing-medium)",
					whiteSpace: "nowrap",
					flexShrink: 0,
					fontFamily: "var(--font-family-outfit)",
					fontSize: "14px",
					color: "#FFFFFF",
				}}
			>
				Send
			</Button>
		</Box>
	);
};

export default Feedback;
