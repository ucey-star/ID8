"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TitleResponse from "./TitleResponse";

interface ExploreMoreData {
	headline: string;
	descriptionShort: string;
	productLink: string;
	demoLink: string;
	descriptionLong: string;
	feedbackQuestion: string;
}

interface ExploreMoreProps {
	data: ExploreMoreData;
	onBack: () => void;
}

const ExploreMore: React.FC<ExploreMoreProps> = ({ data, onBack }) => {
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
				marginBottom: "12px",
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
					onClick={onBack}
					sx={{
						position: "absolute",
						left: 0,
						top: 0,
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
						marginTop: "32px",
						textAlign: "left",
						textUnderlinePosition: "from-font",
						textDecorationSkipInk: "none",
					}}
				>
					{data.headline}
				</Typography>
			</Box>

			<Box
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-medium)",
				}}
			>
				<TitleResponse title="Quick Pitch*" response={data.descriptionShort} />
				{data.productLink && (
					<TitleResponse title="Project URL" response={data.productLink} link />
				)}
				{data.demoLink && (
					<TitleResponse title="Demo Link" response={data.demoLink} link />
				)}
				{data.descriptionLong && (
					<TitleResponse
						title="Detailed Description"
						response={data.descriptionLong}
					/>
				)}
				{data.feedbackQuestion && (
					<TitleResponse
						title="Feedback Request"
						response={data.feedbackQuestion}
					/>
				)}
			</Box>

			{/* <Button
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
			</Button> */}
		</Box>
	);
};

export default ExploreMore;
