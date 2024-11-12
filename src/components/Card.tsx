"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Likes from "./Likes";
import Comments from "./Comments";
import Views from "./Views";

const Card = () => {
	const name = "Muhammad Saleh";
	const date = "December 06, 2024";
	const views = 123;
	const comments = 456;
	const likes = 789;

	const handleExplainMore = () => {
		// Code to display more project information
	};

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
			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography
					variant="h6"
					sx={{
						fontWeight: "var(--font-weight-bold)",
						color: "var(--color-text-primary)",
					}}
				>
					{name}
				</Typography>
				<Typography
					variant="body2"
					sx={{
						color: "var(--color-text-secondary)",
						fontSize: "var(--font-size-body)",
						lineHeight: "20.16px",
					}}
				>
					{date}
				</Typography>
			</Box>

			<Box
				sx={{
					width: "400px",
					height: "400px",
					backgroundColor: "#F0F0F5",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					borderRadius: "8px",
				}}
			>
				<Typography
					sx={{
						color: "var(--color-text-secondary)",
						fontSize: "var(--font-size-body)",
						fontWeight: "var(--font-weight-regular)",
					}}
				>
					Name or Logo or Demo
				</Typography>
			</Box>

			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				<Views views={views} />
				<Box sx={{ width: "1px", backgroundColor: "var(--color-border)", height: "48px" }} />
				<Comments comments={comments} />
				<Box sx={{ width: "1px", backgroundColor: "var(--color-border)", height: "48px" }} />
				<Likes likes={likes} />
			</Box>

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
				}}
				onClick={handleExplainMore}
			>
				Explore More
			</Button>
		</Box>
	);
};

export default Card;
