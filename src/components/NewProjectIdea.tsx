"use client";
import React, { useState } from "react";
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
	Chip,
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

const NewProjectIdea: React.FC<NewProjectIdeaProps> = ({
	user,
	redirectTo,
}) => {
	const [projectName, setProjectName] = useState("");
	const [tagline, setTagline] = useState("");
	const [projectLink, setProjectLink] = useState("");
	const [demoLink, setDemoLink] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [feedbackQuestion, setFeedbackQuestion] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	// Updated error states to include projectDescription
	const [errors, setErrors] = useState({
		projectName: false,
		tagline: false,
		projectDescription: false, // Added projectDescription
	});

	// Updated touched states to include projectDescription
	const [touched, setTouched] = useState({
		projectName: false,
		tagline: false,
		projectDescription: false, // Added projectDescription
	});

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

	// Updated validateForm to include projectDescription
	const validateForm = () => {
		const newErrors = {
			projectName: projectName.trim() === "",
			tagline: tagline.trim() === "",
			projectDescription: projectDescription.trim() === "", // Added validation for projectDescription
		};

		setErrors(newErrors);
		return !Object.values(newErrors).some((error) => error);
	};

	const handleCloseSnackbar = () =>
		setSnackbar((prev) => ({ ...prev, open: false }));

	// Add new state variables for errors at the top with other states
	const [descriptionError, setDescriptionError] = useState<string>("");
	const [taglineError, setTaglineError] = useState<string>("");

	// Modify handleSaveNewProject to include the length validation
	const handleSaveNewProject = async () => {
		// Validate description and tagline length
		if (projectDescription.length < 75) {
			setDescriptionError(
				"Project description must be at least 75 characters long",
			);
			setSnackbar({
				open: true,
				message: "Project description must be at least 75 characters long",
				severity: "error",
			});
			return;
		}

		if (tagline.length < 75) {
			setTaglineError("Short description must be at least 75 characters long");
			setSnackbar({
				open: true,
				message: "Short description must be at least 75 characters long",
				severity: "error",
			});
			return;
		}

		// Updated touched states to include projectDescription
		setTouched({
			projectName: true,
			tagline: true,
			projectDescription: true,
		});

		if (!validateForm()) {
			setSnackbar({
				open: true,
				message: "Please fill in all required fields.",
				severity: "error",
			});
			return;
		}

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
			const { error } = await supabaseClient
				.from("Projects")
				.insert([formData]);
			if (error) throw error;

			setSnackbar({
				open: true,
				message: "New project created successfully!",
				severity: "success",
			});

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
		setTouched((prev) => ({ ...prev, tags: true }));
	};

	const handleBlur = (field: keyof typeof touched) => {
		setTouched((prev) => ({ ...prev, [field]: true }));
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
						required
						fullWidth
						label="Project name"
						value={projectName}
						onChange={(e) => setProjectName(e.target.value)}
						onBlur={() => handleBlur("projectName")}
						error={touched.projectName && errors.projectName}
						helperText={
							touched.projectName && errors.projectName
								? "Project name is required"
								: ""
						}
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
							required
							fullWidth
							label="Describe what your project does in 150 characters or less.*"
							value={tagline}
							onChange={(e) => {
								setTagline(e.target.value);
								if (e.target.value.length >= 75) {
									setTaglineError("");
								}
							}}
							onBlur={() => handleBlur("tagline")}
							error={!!taglineError || (touched.tagline && errors.tagline)}
							helperText={
								taglineError ||
								(touched.tagline && errors.tagline
									? "Tagline is required"
									: `${tagline.length}/150 characters (minimum 75)`)
							}
							FormHelperTextProps={{
								sx: {
									color: tagline.length >= 75 ? "#2E7D32" : "#666666",
									fontFamily: "'Outfit', sans-serif",
									fontSize: "0.875rem",
									marginTop: "8px",
								},
							}}
							variant="outlined"
							inputProps={{ maxLength: 150 }}
						/>
					</Box>

					<TextField
						fullWidth
						label="Please provide a link to the project, if any"
						value={projectLink}
						onChange={(e) => setProjectLink(e.target.value)}
						variant="outlined"
					/>

					<TextField
						fullWidth
						label="If you have a demo, link it below"
						value={demoLink}
						onChange={(e) => setDemoLink(e.target.value)}
						variant="outlined"
					/>

					<TextField
						required
						fullWidth
						label="What is your project going to do? Please describe your product and what it does or will do.*"
						value={projectDescription}
						onChange={(e) => {
							setProjectDescription(e.target.value);
							if (e.target.value.length >= 75) {
								setDescriptionError("");
							}
						}}
						onBlur={() => handleBlur("projectDescription")}
						error={
							!!descriptionError ||
							(touched.projectDescription && errors.projectDescription)
						}
						helperText={
							descriptionError ||
							(touched.projectDescription && errors.projectDescription
								? "Project description is required"
								: `${projectDescription.length}/75 characters minimum`)
						}
						FormHelperTextProps={{
							sx: {
								color: projectDescription.length >= 75 ? "#2E7D32" : "#666666",
								fontFamily: "'Outfit', sans-serif",
								fontSize: "0.875rem",
								marginTop: "8px",
							},
						}}
						variant="outlined"
						multiline
						rows={3}
					/>

					<TextField
						fullWidth
						label="Feedback Question: What aspect of the project idea needs feedback?"
						value={feedbackQuestion}
						onChange={(e) => setFeedbackQuestion(e.target.value)}
						variant="outlined"
						multiline
					/>

					<FormControl fullWidth>
						<InputLabel>
							What are some tags you would associate with your project idea?*
						</InputLabel>
						<Select
							multiple
							value={selectedTags}
							onChange={handleTagChange}
							label="What are some tags you would associate with your project idea?*"
							renderValue={(selected) => (
								<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
									{selected.map((value) => (
										<Chip
											key={value}
											label={value}
											sx={{
												backgroundColor: "#f0f0f0",
												borderRadius: "4px",
												m: "2px",
												"& .MuiChip-label": {
													color: "#000000",
												},
											}}
										/>
									))}
								</Box>
							)}
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
							content="Publish"
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
