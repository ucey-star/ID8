"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TitleResponse from "./TitleResponse";

const ExploreMore = ({ data, onBack }) => {
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
			<Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
				<ArrowBackIosNewIcon
					onClick={onBack}
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
			>
				Like
			</Button>
		</Box>
	);
};

export default ExploreMore;
