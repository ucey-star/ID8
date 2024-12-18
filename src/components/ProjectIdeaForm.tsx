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
	Tooltip,
	Chip,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import GradientButton from "../components/GradientButton";
import type { User } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";
import supabaseClient from "~/api/supabaseConfig";
import { useRouter } from "next/navigation";
import useMobile from "~/utils/useMobile";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useSearchParams } from "next/navigation";

interface ProjectIdeaFormProps {
	user: User | null;
	redirectTo?: string;
}

const ProjectIdeaForm: React.FC<ProjectIdeaFormProps> = ({
	user,
	redirectTo,
}) => {
	const searchParams = useSearchParams();
	const projectId = searchParams.get("projectId");
	const router = useRouter();
	const [projectIdState, setProjectId] = useState<string | null>(null);
	const [projectName, setProjectName] = useState("");
	const [tagline, setTagline] = useState("");
	const [projectLink, setProjectLink] = useState("");
	const [demoLink, setDemoLink] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [feedbackQuestion, setFeedbackQuestion] = useState("");
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [snackbar, setSnackbar] = useState<{
		open: boolean;
		message: string;
		severity: "success" | "error";
	}>({
		open: false,
		message: "",
		severity: "success",
	});
	const [descriptionError, setDescriptionError] = useState<string>("");
	const [taglineError, setTaglineError] = useState<string>("");

	const isMobile = useMobile();

	const handleCloseSnackbar = () =>
		setSnackbar((prev) => ({ ...prev, open: false }));

	// Fetch project details if they exist
	useEffect(() => {
		const fetchProjectDetails = async () => {
			if (!user) {
				console.warn("User is not logged in.");
				setLoading(false);
				return;
			}

			if (!projectId) {
				console.warn("No projectId provided in query parameters.");
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				console.log("Fetching project with project_id:", projectId);

				const { data, error } = await supabaseClient
					.from("Projects")
					.select("*")
					.eq("project_id", projectId)
					.single();

				console.log("Fetched Project Data:", data);
				console.log("Fetch Error:", error);

				if (error) throw error;

				if (data) {
					// Populate fields with existing project data
					console.log("Populating state with:", data);
					setProjectId(data.project_id);
					setProjectName(data.project_name ?? "");
					setTagline(data.tagline ?? "");
					setProjectLink(data.project_url ?? "");
					setDemoLink(data.demo_link ?? "");
					setProjectDescription(data.project_description ?? "");
					setFeedbackQuestion(data.feedback_question ?? "");
					setSelectedTags(data.tags ?? []);
				}
			} catch (error) {
				console.error("Error loading project:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchProjectDetails().catch((err) =>
			console.error("Unexpected error:", err),
		);
	}, [user, projectId]);

	const handleSaveProject = async () => {
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

		const formData: Database["public"]["Tables"]["Projects"]["Insert"] = {
			user_id: user?.id,
			project_name: projectName,
			tagline: tagline,
			project_url: projectLink,
			demo_link: demoLink,
			project_description: projectDescription,
			tags: selectedTags,
			feedback_question: feedbackQuestion,
		};

		try {
			if (projectId) {
				// Update existing project
				const { error: updateError } = await supabaseClient
					.from("Projects")
					.update(formData)
					.eq("project_id", projectId); // Use project_id for updates

				if (updateError) throw updateError;

				setSnackbar({
					open: true,
					message: "Project updated successfully!",
					severity: "success",
				});
			} else {
				// Insert new project if none exists
				const { data, error } = await supabaseClient
					.from("Projects")
					.insert([formData])
					.select(); // Get the created project data

				if (error) throw error;

				setProjectId(data[0]?.project_id ?? null); // Save the new project ID for future updates
				setSnackbar({
					open: true,
					message: "Project created successfully!",
					severity: "success",
				});
			}

			// Redirect after saving
			setTimeout(() => {
				router.push(redirectTo ?? "/home");
			}, 1000);
		} catch (error) {
			console.error("Error saving project:", error);
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

	if (loading) {
		return <Box>Loading...</Box>;
	}

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
								if (e.target.value.length >= 75) {
									setTaglineError("");
								}
							}}
							variant="outlined"
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
						label="What is your project going to do? Please describe your product and what it does or will do.*"
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
								color: projectDescription.length >= 300 ? "#2E7D32" : "#666666",
								fontFamily: "'Outfit', sans-serif",
								fontSize: "0.875rem",
								marginTop: "8px",
							},
						}}
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
							onClick={handleSaveProject}
							content="Save Updates"
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

export default ProjectIdeaForm;
