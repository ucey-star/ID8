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
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import GradientButton from "../components/GradientButton";
import type { User } from "@supabase/supabase-js";
import supabaseClient from "~/api/supabaseConfig";
import useMobile from "~/utils/useMobile";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Tooltip from "@mui/material/Tooltip";

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

		if (tagline.length < 75) {
			setTaglineError("Short description must be at least 75 characters long");
			setSnackbar({
				open: true,
				message: "Short description must be at least 75 characters long",
				severity: "error",
			});
			return;
		}

		if (projectDescription.length < 300) {
			setDescriptionError(
				"Project description must be at least 300 characters long",
			);
			setSnackbar({
				open: true,
				message: "Project description must be at least 300 characters long",
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
						gap: "24px",
						marginBottom: "32px",
						padding: "8px",
					}}
				>
					<Box sx={{ textAlign: "left" }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Typography
								variant="subtitle1"
								sx={{
									fontWeight: 500,
									marginBottom: "8px",
									marginTop: "8px",
									color: "#2D2D2D",
									fontFamily: "'Outfit', sans-serif",
								}}
							>
								Project Name*
							</Typography>
							<Tooltip
								title="What's the name you want people to remember your project by? Keep it short and memorable."
								placement="right"
							>
								<InfoOutlinedIcon
									sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
								/>
							</Tooltip>
						</Box>
						<TextField
							fullWidth
							placeholder="e.g., Seat Magician"
							value={projectName}
							onChange={(e) => setProjectName(e.target.value)}
							variant="outlined"
						/>
					</Box>

					<Box sx={{ textAlign: "left" }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Typography
								variant="subtitle1"
								sx={{
									fontWeight: 500,
									marginBottom: "8px",
									marginTop: "8px",
									color: "#2D2D2D",
									fontFamily: "'Outfit', sans-serif",
								}}
							>
								Quick Pitch*
							</Typography>
							<Tooltip
								title="How would you describe your project to someone in an elevator? Focus on the main problem it solves. The limit is 150 characters."
								placement="right"
							>
								<InfoOutlinedIcon
									sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
								/>
							</Tooltip>
						</Box>
						<TextField
							fullWidth
							multiline
							value={tagline}
							onChange={(e) => {
								setTagline(e.target.value);
								if (e.target.value.length >= 75) {
									setTaglineError("");
								}
							}}
							variant="outlined"
							placeholder="e.g., A web app that helps couples create perfect seating charts for their wedding reception"
							inputProps={{ maxLength: 150 }}
							error={!!taglineError}
							helperText={
								taglineError || `${tagline.length}/150 characters (minimum 75)`
							}
							FormHelperTextProps={{
								sx: {
									color: tagline.length >= 75 ? "#2E7D32" : "#666666",
									fontFamily: "'Outfit', sans-serif",
									fontSize: "0.875rem",
									marginTop: "8px",
								},
							}}
						/>
						<span
							style={{
								alignSelf: "flex-end",
								color: "#6C6C80",
								fontSize: "14px",
								marginTop: "4px",
							}}
						></span>
					</Box>

					<Box sx={{ textAlign: "left" }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Typography
								variant="subtitle1"
								sx={{
									fontWeight: 500,
									marginBottom: "8px",
									marginTop: "8px",
									color: "#2D2D2D",
									fontFamily: "'Outfit', sans-serif",
								}}
							>
								Project URL
							</Typography>
							<Tooltip
								title="Where can people find your project online? Include your website, GitHub repository, or any other relevant links."
								placement="right"
							>
								<InfoOutlinedIcon
									sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
								/>
							</Tooltip>
						</Box>
						<TextField
							fullWidth
							placeholder="e.g., https://www.seatmagician.com"
							value={projectLink}
							onChange={(e) => setProjectLink(e.target.value)}
							variant="outlined"
						/>
					</Box>

					<Box sx={{ textAlign: "left" }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Typography
								variant="subtitle1"
								sx={{
									fontWeight: 500,
									marginBottom: "8px",
									marginTop: "8px",
									color: "#2D2D2D",
									fontFamily: "'Outfit', sans-serif",
								}}
							>
								Demo Link
							</Typography>
							<Tooltip
								title="Share a video or interactive demo that shows your project in action. Loom videos work great!"
								placement="right"
							>
								<InfoOutlinedIcon
									sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
								/>
							</Tooltip>
						</Box>
						<TextField
							fullWidth
							placeholder="e.g., https://www.loom.com/share/your-demo"
							value={demoLink}
							onChange={(e) => setDemoLink(e.target.value)}
							variant="outlined"
						/>
					</Box>

					<Box sx={{ textAlign: "left" }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Typography
								variant="subtitle1"
								sx={{
									fontWeight: 500,
									marginBottom: "8px",
									marginTop: "8px",
									color: "#2D2D2D",
									fontFamily: "'Outfit', sans-serif",
								}}
							>
								Detailed Description
							</Typography>
							<Tooltip
								title="What problem does your project solve? Who is it for? How does it work? Include your motivation and technical approach."
								placement="right"
							>
								<InfoOutlinedIcon
									sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
								/>
							</Tooltip>
						</Box>
						<TextField
							fullWidth
							placeholder="e.g., Seat Magician simplifies wedding planning by automating seating arrangements. It considers relationships, preferences, and table constraints to create optimal seating charts..."
							value={projectDescription}
							onChange={(e) => {
								setProjectDescription(e.target.value);
								if (e.target.value.length >= 300) {
									setDescriptionError("");
								}
							}}
							variant="outlined"
							multiline
							rows={3}
							error={!!descriptionError}
							helperText={
								descriptionError ||
								`${projectDescription.length}/300 characters minimum`
							}
							FormHelperTextProps={{
								sx: {
									color:
										projectDescription.length >= 300 ? "#2E7D32" : "#666666",
									fontFamily: "'Outfit', sans-serif",
									fontSize: "0.875rem",
									marginTop: "8px",
								},
							}}
						/>
					</Box>
					<Box sx={{ textAlign: "left" }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Typography
								variant="subtitle1"
								sx={{
									fontWeight: 500,
									marginBottom: "8px",
									marginTop: "8px",
									color: "#2D2D2D",
									fontFamily: "'Outfit', sans-serif",
								}}
							>
								Feedback Request
							</Typography>
							<Tooltip
								title="What specific aspects of your project would you like feedback on? Technical implementation? User experience? Business model?"
								placement="right"
							>
								<InfoOutlinedIcon
									sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
								/>
							</Tooltip>
						</Box>
						<TextField
							fullWidth
							placeholder="e.g., I'm looking for ideas on how to incorporate statistical analysis..."
							value={feedbackQuestion}
							onChange={(e) => setFeedbackQuestion(e.target.value)}
							variant="outlined"
						/>
					</Box>

					<Box sx={{ textAlign: "left" }}>
						<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
							<Typography
								variant="subtitle1"
								sx={{
									fontWeight: 500,
									marginBottom: "8px",
									marginTop: "8px",
									color: "#2D2D2D",
									fontFamily: "'Outfit', sans-serif",
								}}
							>
								Project Categories*
							</Typography>
							<Tooltip
								title="Select all academic disciplines that your project relates to. This helps match you with relevant feedback."
								placement="right"
							>
								<InfoOutlinedIcon
									sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
								/>
							</Tooltip>
						</Box>
						<FormControl fullWidth>
							<Select
								multiple
								value={selectedTags}
								onChange={handleTagChange}
								displayEmpty
								renderValue={(selected) => {
									if (selected.length === 0) {
										return (
											<p style={{ color: "rgba(0, 0, 0, 0.38)" }}>
												Select project categories
											</p>
										);
									}
									return selected.join(", ");
								}}
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
					</Box>

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
