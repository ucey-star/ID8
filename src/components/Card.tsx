"use client";

import React from "react";
import { Box, Typography, Chip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import GradientButton from "../components/GradientButton";
import useMobile from "~/utils/useMobile";

interface CardProps {
	name: string | null;
	date: string;
	descriptionShort: string;
	headline: string;
	tags?: string[]; // Tags prop
	onExploreMore: () => void;
	buttonLabel?: string;
	isDeletable?: boolean;
	onDelete?: () => void;
}

const Card: React.FC<CardProps> = ({
	name,
	date,
	descriptionShort,
	headline,
	tags = [], // Default empty array
	onExploreMore,
	buttonLabel = "Explore More",
	isDeletable = false,
	onDelete,
}) => {
	// Define darker colors for tags
	const tagColors: Record<string, string> = {
		"Computer Science (CS)": "#4CB8A5", // Dark Blue
		"Social Sciences (SS)": "#F9A825", // Dark Green
		"Arts and Humanities (AH)": "#FF6F61", // Dark Red
		"Natural Sciences (NS)": "#8E6EB4", // Dark Orange
		"Business (B)": "#FFD700", // Dark Yellow
	};

	const isMobile = useMobile();

	return (
		<Box
			sx={{
				position: "relative",
				width: `${isMobile ? "90%" : "65%"}`,
				backgroundColor: "var(--color-background-paper)",
				padding: `${isMobile ? "var(--spacing-medium)" : "var(--spacing-large)"}`,
				borderRadius: "16px",
				border: `1px solid var(--color-border)`,
				boxShadow: "var(--box-shadow)",
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-start",
				alignItems: "stretch",
				gap: "var(--spacing-medium)",
				fontFamily: "Outfit, sans-serif",
				minHeight: "200px",
				flexGrow: 1,
				margin: "0 auto",
				textAlign: "center",
				transition: "transform 0.2s",
				"&:hover": { transform: "scale(1.02)" },
			}}
		>
			{/* Top Section: Headline on Left, Name and Date on Right */}
			<Box
				sx={{
					display: "flex",
					flexDirection: `${isMobile ? "column" : "row"}`,
					justifyContent: "space-between", // Space between headline and name/date
					alignItems: "center",
					width: "100%",
				}}
			>
				{/* Headline Upper left*/}
				<Typography
					variant="h5"
					sx={{
						fontWeight: "var(--font-weight-bold)",
						color: "var(--color-text-primary)",
						fontFamily: "Outfit, sans-serif",
					}}
				>
					{headline}
				</Typography>

				{/* Date */}
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-end",
						gap: "4px",
					}}
				>
					<Typography
						variant="body1"
						sx={{
							fontWeight: "var(--font-weight-bold)",
							color: "var(--color-text-primary)",
							fontFamily: "Outfit, sans-serif",
						}}
					>
						{date}
					</Typography>
				</Box>
			</Box>

			{/* Middle Section: Short Description */}
			<Box
				sx={{
					flexGrow: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<Typography
					variant="subtitle1"
					sx={{
						color: "var(--color-text-secondary)",
						fontStyle: "italic",
						fontWeight: "var(--font-weight-medium)",
						fontFamily: "Outfit, sans-serif",
					}}
				>
					{descriptionShort}
				</Typography>
			</Box>

			{/* Tags Section (Below Description) */}
			<Box
				sx={{
					display: "flex",
					justifyContent: `${isMobile ? "center" : `flex-start`}`, // Align tags to the left, center on mobile
					alignItems: "center", // Center vertically
					flexWrap: "wrap", // Allow tags to wrap to the next line if needed
					gap: "8px", // Space between chips
					marginTop: "12px", // Add some spacing above the tags
					width: "100%", // Take full width of the card
				}}
			>
				{tags.map((tag) => (
					<Chip
						key={tag}
						label={tag}
						sx={{
							backgroundColor: tagColors[tag] ?? "#424242", // Fallback to dark gray
							color: "#ffffff", // White text for contrast
							fontSize: "0.65rem", // Smaller font size
							height: "22px", // Reduced height for smaller tags
							padding: "2px 6px", // Smaller padding inside the chip
							fontWeight: "500", // Maintain readability
							fontFamily: "Outfit, sans-serif",
						}}
					/>
				))}
			</Box>

			{/* Bottom Section: Button */}
			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "center", // Center the button
				}}
			>
				<GradientButton
					onClick={onExploreMore}
					content={buttonLabel}
					className="w-full" // Adjust width as needed
				/>

				{/* Delete Button*/}
				{isDeletable && (
					<IconButton
						onClick={onDelete}
						sx={{
							position: "absolute",
							bottom: "12px",
							right: "12px",
							color: "#FF6F61",
						}}
						aria-label="delete"
					>
						<DeleteIcon />
					</IconButton>
				)}
			</Box>
		</Box>
	);
};

export default Card;
