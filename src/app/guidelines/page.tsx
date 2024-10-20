import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";

const GuidelinesScreen: React.FC = () => {
	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "linear-gradient(135deg, #F7F7F8, #E3E7FF, #DCE0FF)",
				fontFamily: "Outfit, sans-serif",
				padding: "70px",
			}}
		>
			<Container
				maxWidth="md"
				sx={{
					width: "1500px",
					backgroundColor: "#FFFFFF",
					padding: "48px",
					borderRadius: "16px",
					border: "1px solid #D6D6E7",
					boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
				}}
			>
				{/* Heading Section */}
				<Typography
					variant="h4"
					component="h1"
					sx={{
						textAlign: "center",
						fontWeight: 600,
						fontSize: "32px",
						lineHeight: "40.32px",
						marginBottom: "12px",
						fontFamily: "Outfit, sans-serif",
					}}
				>
					Welcome to Startup Validator
				</Typography>

				<Typography
					variant="h6"
					component="h2"
					sx={{
						textAlign: "center",
						fontWeight: 400,
						fontSize: "24px",
						lineHeight: "30.24px",
						color: "#6C6C80",
						marginBottom: "32px",
						fontFamily: "Outfit, sans-serif",
					}}
				>
					Take a moment to review our guidelines
				</Typography>

				{/* Guidelines List */}
				<Box
					component="ul"
					sx={{
						listStyle: "none",
						paddingLeft: 0,
						marginBottom: "32px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 2,
					}}
				>
					{[
						"Be constructive and specific: Offer actionable feedback with clear examples for improvement.",
						"Stay respectful: Maintain a positive tone; avoid harsh criticism or dismissive language.",
						"Focus on the idea, not the person: Critique the concept, not the individual proposing it.",
						"Be concise: Keep your feedback brief and to the point, avoiding unnecessary details.",
						"Ask questions: Encourage deeper thinking by asking clarifying or thought-provoking questions.",
						"Highlight strengths: Acknowledge what works well to balance criticism and motivate improvement.",
					].map((text, index) => (
						<Box
							key={index}
							component="li"
							sx={{
								display: "grid",
								gridTemplateColumns: "50px 1fr",
								alignItems: "center",
								marginBottom: "16px",
								justifyContent: "center",
								width: "100%",
								maxWidth: "700px",
							}}
						>
							<Typography
								variant="h2"
								sx={{
									color: "#B3B3C6",
									fontSize: "2.5rem",
									textAlign: "right",
									paddingRight: "16px",
									fontFamily: "Outfit, sans-serif",
								}}
							>
								{index + 1}
							</Typography>
							<Typography
								variant="body1"
								sx={{
									fontWeight: 400,
									fontSize: "16px",
									lineHeight: "20.16px",
									color: "#333333",
									fontFamily: "Outfit, sans-serif",
								}}
							>
								{text}
							</Typography>
						</Box>
					))}
				</Box>

				{/* Next Button */}
				<Box sx={{ textAlign: "center" }}>
					<Button variant="contained" className="custom-next-button">
						Next
					</Button>
				</Box>
			</Container>
		</Box>
	);
};

export default GuidelinesScreen;
