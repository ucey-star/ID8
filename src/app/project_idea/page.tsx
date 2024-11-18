"use client";

import React, { useState } from "react";
import {
	Box,
	TextField,
	Container,
	Typography,
	Link,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Checkbox,
	ListItemText,
	type SelectChangeEvent,
} from "@mui/material";
import GradientButton from "~/components/GradientButton";

const ProjectIdeaScreen: React.FC = () => {
	const [projectName, setProjectName] = useState("");
	const [description, setDescription] = useState("");
	const [projectLink, setProjectLink] = useState("");
	const [demoLink, setDemoLink] = useState("");
	const [productDescription, setProductDescription] = useState("");
	const [selectedMajors, setSelectedMajors] = useState<string[]>([]);

	const handleSaveDraft = () => {
		// Logic to save the draft
	};

	const handleMajorChange = (event: SelectChangeEvent<string[]>) => {
		const value = event.target.value as unknown as string[];
		setSelectedMajors(value);
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "linear-gradient(135deg, #F7F7F8, #E3E7FF, #DCE0FF)",
				padding: "70px",
			}}
		>
			<Container
				maxWidth="sm"
				sx={{
					backgroundColor: "#FFFFFF",
					padding: "48px",
					borderRadius: "16px",
					border: "1px solid #D6D6E7",
					boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
					textAlign: "center",
				}}
			>
				{/* Header */}
				<Typography
					variant="h5"
					component="h1"
					sx={{
						color: "#000000",
						fontWeight: 600,
						fontSize: "32px",
						lineHeight: "40.32px",
						marginBottom: "32px",
						fontFamily: "'Outfit', sans-serif",
					}}
				>
					Project Idea
				</Typography>
				<Typography
					variant="body2"
					sx={{
						color: "#6C6C80",
						marginBottom: "46px",
						fontSize: "20px",
						lineHeight: "28px",
						fontFamily: "'Outfit', sans-serif",
					}}
				>
					Fill out as much detail as possible to help others understand your
					project.
				</Typography>

				{/* Form Fields */}
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "40px",
						marginBottom: "32px",
						padding: "8px",
					}}
				>
					<TextField
						fullWidth
						label="Project name*"
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
						variant="outlined"
					/>

					<TextField
						fullWidth
						label="Describe what your project does in 150 characters or less.*"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						variant="outlined"
						inputProps={{ maxLength: 150 }}
					/>
					<TextField
						fullWidth
						label="Please provide a link to the project, if any."
						value={projectLink}
						onChange={(e) => setProjectLink(e.target.value)}
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="If you have a demo, link it below."
						value={demoLink}
						onChange={(e) => setDemoLink(e.target.value)}
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="What is your project going to do? Please describe your product and what it does or will do."
						value={productDescription}
						onChange={(e) => setProductDescription(e.target.value)}
						variant="outlined"
						multiline
						rows={3}
					/>

					{/* Tags Field with Multi-Select Dropdown */}
					<FormControl fullWidth>
						<InputLabel>
							What are somes tags your would associate with your project idea?*
						</InputLabel>
						<Select
							multiple
							value={selectedMajors}
							onChange={handleMajorChange}
							label="What are somes tags your would associate with your project idea?*"
							renderValue={(selected) => selected.join(", ")}
							variant="outlined"
						>
							{[
								"Computer Science (CS)",
								"Social Sciences (SS)",
								"Arts and Humanities (AH)",
								"Natural Sciences (NS)",
							].map((major) => (
								<MenuItem key={major} value={major}>
									<Checkbox checked={selectedMajors.includes(major)} />
									<ListItemText primary={major} />
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>

				{/* Save Button and Go Back Link */}
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<GradientButton
						onClick={handleSaveDraft}
						content="Save the draft"
						className="w-1/2"
					/>
					<Link
						href="#"
						underline="hover"
						sx={{ marginTop: "16px", color: "#6C6C80" }}
					>
						Go back
					</Link>
				</Box>
			</Container>
		</Box>
	);
};

export default ProjectIdeaScreen;
