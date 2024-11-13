"use client";
import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import Views from "./Views";
import Comments from "./Comments";
import Likes from "./Likes";
import FeedbackItem from "./FeedbackItem";

const Feedback = () => {
	// Hardcoded data
	const views = 123;
	const comments = 456;
	const likes = 789;

	const feedbackData = [
		{
			name: "Muhammad Saleh",
			timeAgo: "2 weeks ago",
			feedback: "Great user problem focus—make sure it addresses a significant pain point.",
		},
		{
			name: "Ava Nelson",
			timeAgo: "5 weeks ago",
			feedback: "Unique approach! Validate with real users to gauge genuine demand and usability.",
		},
		{
			name: "Mykhailo Chudyk",
			timeAgo: "7 weeks ago",
			feedback: "User onboarding flow will be crucial—ensure simplicity and engagement from the start.",
		},
		{
			name: "Matviy Kotolyk",
			timeAgo: "9 weeks ago",
			feedback: "Scalability is key. How will you handle growth if user demand spikes?",
		},
	];

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
				<Views views={views} />
				<Box
					sx={{
						width: "1px",
						backgroundColor: "var(--color-border)",
						height: "48px",
					}}
				/>
				<Comments comments={comments} />
				<Box
					sx={{
						width: "1px",
						backgroundColor: "var(--color-border)",
						height: "48px",
					}}
				/>
				<Likes likes={likes} />
			</Box>

			<Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "var(--spacing-small)" }}>
				{feedbackData.map((item, index) => (
					<FeedbackItem key={index} name={item.name} timeAgo={item.timeAgo} feedback={item.feedback} />
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
				}}
			>
				Send
			</Button>
		</Box>
	);
};

export default Feedback;
