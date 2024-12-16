"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				minHeight: "100vh",
				background: "linear-gradient(to right, #f8f9fc, #e3e7ff)",
				padding: "20px",
			}}
		>
			<Box
				sx={{
					backgroundColor: "white",
					borderRadius: "16px",
					boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
					padding: "40px",
					width: "100%",
					maxWidth: "500px",
					textAlign: "center",
				}}
			>
				<Typography
					variant="h4"
					sx={{
						fontWeight: "bold",
						marginBottom: "16px",
						color: "#333",
						fontFamily: "Arial, sans-serif",
					}}
				>
					Welcome to the Platform
				</Typography>
				<Typography
					sx={{
						fontSize: "16px",
						marginBottom: "24px",
						color: "#666",
						fontFamily: "Arial, sans-serif",
					}}
				>
					Follow these steps to get started:
				</Typography>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "24px",
						alignItems: "center",
						fontFamily: "Arial, sans-serif",
					}}
				>
					{/* Step 1 */}
					<Box sx={{ textAlign: "left", width: "100%" }}>
						<Typography
							variant="h6"
							sx={{
								fontWeight: "bold",
								marginBottom: "8px",
								color: "#333",
							}}
						>
							Step 1: Complete Your Profile
						</Typography>
						<Typography
							sx={{
								fontSize: "14px",
								marginBottom: "12px",
								color: "#666",
							}}
						>
							Make sure others can understand who you are by completing your
							profile.
						</Typography>
						<Link
							href={{
								pathname: "/personal-details",
								query: { step: "complete-profile" },
							}}
							passHref
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
							>
								Complete Profile
							</Button>
						</Link>
					</Box>

					{/* Step 2 */}
					<Box sx={{ textAlign: "left", width: "100%" }}>
						<Typography
							variant="h6"
							sx={{
								fontWeight: "bold",
								marginBottom: "8px",
								color: "#333",
							}}
						>
							Step 2: Add a New Project
						</Typography>
						<Typography
							sx={{
								fontSize: "14px",
								marginBottom: "12px",
								color: "#666",
							}}
						>
							Share your innovative ideas by adding a new project to your
							portfolio.
						</Typography>
						<Link href="/new_project_idea" passHref>
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
							>
								Add a Project
							</Button>
						</Link>
					</Box>

					{/* Step 3 */}
					<Box sx={{ textAlign: "left", width: "100%" }}>
						<Typography
							variant="h6"
							sx={{
								fontWeight: "bold",
								marginBottom: "8px",
								color: "#333",
							}}
						>
							Step 3: Go to Your Projects
						</Typography>
						<Typography
							sx={{
								fontSize: "14px",
								marginBottom: "12px",
								color: "#666",
							}}
						>
							Manage and view all the projects you&apos;ve added so far.
						</Typography>
						<Link href="/my_projects" passHref>
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
							>
								My Projects
							</Button>
						</Link>
					</Box>

					{/* Step 4 */}
					<Box sx={{ textAlign: "left", width: "100%" }}>
						<Typography
							variant="h6"
							sx={{
								fontWeight: "bold",
								marginBottom: "8px",
								color: "#333",
							}}
						>
							Step 4: Go to Feed
						</Typography>
						<Typography
							sx={{
								fontSize: "14px",
								marginBottom: "12px",
								color: "#666",
							}}
						>
							Check out what others are working on and share your feedback.
						</Typography>
						<Link href="/home" passHref>
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
							>
								Go to Feed
							</Button>
						</Link>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
