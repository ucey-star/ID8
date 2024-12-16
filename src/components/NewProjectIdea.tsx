"use client";

import React, { useState, useEffect } from "react";
import {
	Box,
	Container,
	Typography,
	Link,
	TextField,
	Select,
	MenuItem,
	FormControl,
	Checkbox,
	ListItemText,
	Snackbar,
	Alert,
	InputLabel,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import GradientButton from "../components/GradientButton";
import type { User } from "@supabase/supabase-js";
import supabaseClient from "~/api/supabaseConfig";
import useMobile from "~/utils/useMobile";

interface NewProjectIdeaProps {
	user: User | null;
	redirectTo?: string;
}

const NewProjectIdea: React.FC<NewProjectIdeaProps> = ({ user, redirectTo }) => {
	const [characterCounter, setCharacterCounter] = useState(0);
	const [projectName, setProjectName] = useState("");
	const [tagline, setTagline] = useState("");
	const [projectLink, setProjectLink] = useState("");
	const [demoLink, setDemoLink] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [feedbackQuestion, setFeedbackQuestion] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [snackbar, setSnackbar] = useState<{
		open: boolean;
		message: string;
		severity: "success" | "error";
	}>({
		open: false,
		message: "",
		severity: "success",
	});

	const isMobile = useMobile();

	const handleCloseSnackbar = () =>
		setSnackbar((prev) => ({ ...prev, open: false }));

	const handleSaveNewProject = async () => {
		if (!user) {
			setSnackbar({
				open: true,
				message: "You need to be logged in to save a project.",
				severity: "error",
			});
			return;
		}

		const formData = {
			user_id: user.id,
			project_name: projectName,
			tagline: tagline,
			project_url: projectLink,
			demo_link: demoLink,
			project_description: projectDescription,
			tags: selectedTags,
			feedback_question: feedbackQuestion,
		};

		try {
			// Insert new project
			const { error } = await supabaseClient
				.from("Projects")
				.insert([formData]);

			if (error) throw error;

			setSnackbar({
				open: true,
				message: "New project created successfully!",
				severity: "success",
			});

			// Redirect after saving
			setTimeout(() => {
				window.location.href = redirectTo ?? "/home";
			}, 1000);
		} catch (error) {
			console.error("Error creating new project:", error);
			setSnackbar({
				open: true,
				message: "Error saving project. Please try again.",
				severity: "error",
			});
		}
	};

	const handleTagChange = (event: SelectChangeEvent<string[]>) => {
		const value = event.target.value as unknown as string[];
		setSelectedTags(value);
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "linear-gradient(135deg, #F7F7F8, #E3E7FF, #DCE0FF)",
				padding: `${isMobile ? "20px" : "70px"}`,
			}}
		>
			<Container
				maxWidth="sm"
				sx={{
					backgroundColor: "#FFFFFF",
					padding: `${isMobile ? "24px" : "48px"}`,
					borderRadius: "16px",
					border: "1px solid #D6D6E7",
					boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
					textAlign: "center",
				}}
			>
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
					New Project Idea
				</Typography>
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
						multiline
						label="Project name*"
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
						variant="outlined"
					/>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: "2px",
						}}
					>
						<TextField
							fullWidth
							multiline
							label="Describe what your project does in 150 characters or less.*"
							value={tagline}
							onChange={(e) => {
								setTagline(e.target.value);
								setCharacterCounter(e.target.value.length);
							}}
							variant="outlined"
							inputProps={{ maxLength: 150 }}
						/>
						<span style={{ alignSelf: "flex-end", color: "#666" }}>
							Character Counter: {characterCounter}
						</span>
					</Box>
					<TextField
						fullWidth
						multiline
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
						value={projectDescription}
						onChange={(e) => setProjectDescription(e.target.value)}
						variant="outlined"
						multiline
						rows={3}
					/>

					<TextField
						fullWidth
						multiline
						label="Feedback Question: What aspect of the project idea needs feedback?"
						value={feedbackQuestion}
						onChange={(e) => setFeedbackQuestion(e.target.value)}
						variant="outlined"
					/>

					<FormControl fullWidth>
						<InputLabel>
							What are some tags you would associate with your project idea?*
						</InputLabel>
						<Select
							multiple
							value={selectedTags}
							onChange={handleTagChange}
							renderValue={(selected) => selected.join(", ")}
							variant="outlined"
						>
							{[
								"Computer Science (CS)",
								"Social Sciences (SS)",
								"Arts and Humanities (AH)",
								"Natural Sciences (NS)",
								"Business (B)",
							].map((tag) => (
								<MenuItem key={tag} value={tag}>
									<Checkbox checked={selectedTags.includes(tag)} />
									<ListItemText primary={tag} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<GradientButton
							onClick={handleSaveNewProject}
							content="Save"
							className="w-1/2"
						/>
						<Link
							href="/home"
							underline="hover"
							sx={{ marginTop: "16px", color: "#6C6C80" }}
						>
							Go back
						</Link>
					</Box>

					{/* Snackbar for notifications */}
					<Snackbar
						open={snackbar.open}
						autoHideDuration={snackbar.severity === "error" ? 6000 : 2000}
						onClose={handleCloseSnackbar}
					>
						<Alert
							onClose={handleCloseSnackbar}
							severity={snackbar.severity}
							sx={{ width: "100%" }}
						>
							{snackbar.message}
						</Alert>
					</Snackbar>
				</Box>
			</Container>
		</Box>
	);
};

export default NewProjectIdea;
