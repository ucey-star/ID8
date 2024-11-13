"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TitleResponse from "./TitleResponse";

const ExploreMore = () => {
	// Hardcoded data (for now)
	const data = {
		headline: "Saleh’s Startup Idea",
		startupName: "Matchstick",
		descriptionShort: "Mobile App for Matchmakers",
		productLink: "https://www.facebook.com/groups/2689639201174278/",
		demoLink: "https://youtu.be/qL7zrWcv6XY?feature=shared",
		descriptionLong:
			"Matchstick is a mobile app that addresses the challenges faced by matchmakers in their work.\n\n" +
			"Matchmaking is growing all around the world as put by a NYT article, 'With television shows like " +
			"'Million Dollar Matchmaker' and 'Indian Matchmaking,' and a pandemic that has made it harder for singles " +
			"to meet organically, matchmaking is hot again.' For our company, we plan to build an app for matchmakers " +
			"in Pakistan, aka Rishta Aunties, and expand internationally in the future.\n\n" +
			"Based on a survey by BBC, 90% of marriages in the region are arranged marriages, and the majority of " +
			"them are done through matchmakers. Over the years, the matchmaking business in South Asia has evolved " +
			"into a US$292 million industry. Despite this growth, matchmakers continue to rely on outdated pen-and-paper " +
			"methods, leading to challenges and inefficiencies. Our objective is to understand these challenges and " +
			"propose a customer-centric solution that leverages technology to enhance matchmaking efficiency and " +
			"effectiveness in connecting families and enable matchmakers to create meaningful, long-lasting relationships.",
	};

	const handleArrowClick = () => {
		// Define arrow click action here
	};

	const handleLikeClick = () => {
		// Define like button action here
	};

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: "500px",
				backgroundColor: "var(--color-background-paper)",
				padding: "48px",
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
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
				}}
			>
				<ArrowBackIosNewIcon
					onClick={handleArrowClick}
					sx={{
						position: "absolute",
						left: 0,
						cursor: "pointer",
						color: "#5370F7",
					}}
				/>
				<Typography
					sx={{
						fontFamily: "var(--font-family-outfit)",
						fontSize: "32px",
						fontWeight: 600,
						lineHeight: "40.32px",
						textAlign: "left",
						textUnderlinePosition: "from-font",
						textDecorationSkipInk: "none",
					}}
				>
					{data.headline}
				</Typography>
			</Box>

			<Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "var(--spacing-medium)" }}>
				<TitleResponse title="Startup name" response={data.startupName} />
				<TitleResponse title="Describe what your company does in 50 characters or less.*" response={data.descriptionShort} />
				<TitleResponse title="Please provide a link to the product, if any." response={data.productLink} link />
				<TitleResponse title="If you have a demo, attach it below." response={data.demoLink} link />
				<TitleResponse title="What is your company going to make? Please describe your product and what it does or will do." response={data.descriptionLong} />
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
				onClick={handleLikeClick}
			>
				Like
			</Button>
		</Box>
	);
};

export default ExploreMore;
