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
				backgroundColor: "#FFFFFF",
				padding: "32px",
				borderRadius: "16px",
				border: "1px solid #D6D6E7",
				boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
				display: "flex",
				flexDirection: "column",
				gap: "24px",
				alignItems: "center",
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
						fontWeight: 600,
						color: "#333",
						fontFamily: "Outfit, sans-serif",
					}}
				>
					{name}
				</Typography>
				<Typography
					variant="body2"
					sx={{
						color: "#6C6C80",
						fontSize: "16px",
						lineHeight: "20.16px",
						fontFamily: "Outfit, sans-serif",
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
						color: "#6C6C80",
						fontSize: "16px",
						fontWeight: 400,
						fontFamily: "Outfit, sans-serif",
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
				<Box
					sx={{ width: "1px", backgroundColor: "#D6D6E7", height: "48px" }}
				/>
				<Comments comments={comments} />
				<Box
					sx={{ width: "1px", backgroundColor: "#D6D6E7", height: "48px" }}
				/>
				<Likes likes={likes} />
			</Box>

			<Button
				variant="contained"
				className="custom-next-button"
				sx={{
					width: "fit-content",
					minWidth: 120,
					padding: "8px 16px",
					whiteSpace: "nowrap",
					flexShrink: 0,
					fontFamily: "Outfit, sans-serif",
				}}
				onClick={handleExplainMore}
			>
				Explore More
			</Button>
		</Box>
	);
};

export default Card;
