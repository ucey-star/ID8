"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";

interface CardProps {
	name: string| null;
	date: string;
	descriptionShort: string;
	headline: string;
	onExploreMore: () => void;
}

const Card: React.FC<CardProps> = ({
	name,
	date,
	descriptionShort,
	headline,
	onExploreMore,
}) => {
	return (
		<Box
			sx={{
				width: "65%",
				backgroundColor: "var(--color-background-paper)",
				padding: "var(--spacing-large)",
				borderRadius: "16px",
				border: `1px solid var(--color-border)`,
				boxShadow: "var(--box-shadow)",
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-start",
				alignItems: "stretch",
				gap: "var(--spacing-medium)",
				fontFamily: "var(--font-family-outfit)",
				minHeight: "180px",
				flexGrow: 1,
				margin: "0 auto",
				textAlign: "center",
			}}
		>
			{/* Top Section: Headline on Left, Name and Date on Right */}
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between", // Space between headline and name/date
					alignItems: "flex-start",
					width: "100%",
				}}
			>
				{/* Headline (Upper Left) */}
				<Typography
					variant="h5"
					sx={{
						fontWeight: "var(--font-weight-bold)",
						color: "var(--color-text-primary)",
					}}
				>
					{headline}
				</Typography>

				{/* Name and Date (Upper Right) */}
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-end", // Align items to the right
						gap: "4px", // Small gap between name and date
					}}
				>
					<Typography
						variant="body1"
						sx={{
							color: "var(--color-text-secondary)",
						}}
					>
						{name}
					</Typography>
					<Typography
						variant="body1"
						sx={{
							fontWeight: "var(--font-weight-bold)",
							color: "var(--color-text-primary)",
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
				}}
			>
				<Typography
					variant="subtitle1"
					sx={{
						color: "var(--color-text-secondary)",
						fontStyle: "italic",
						fontWeight: "var(--font-weight-medium)",
					}}
				>
					{descriptionShort}
				</Typography>
			</Box>

			{/* Bottom Section: Button */}
			<Box
				sx={{
					width: "100%",
					display: "flex",
					justifyContent: "center", // Center the button
				}}
			>
				<Button
					variant="contained"
					className="custom-next-button"
					sx={{
						minWidth: "150px",
						padding: "var(--spacing-small) var(--spacing-medium)",
						whiteSpace: "nowrap",
						fontFamily: "var(--font-family-outfit)",
						alignItems: "center",
					}}
					onClick={onExploreMore}
				>
					Explore More
				</Button>
			</Box>
		</Box>
	);
};

export default Card;
