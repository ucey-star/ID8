"use client";

import React, { useState, useEffect } from "react";
import {
	Box,
	TextField,
	Select,
	MenuItem,
	FormControl,
	Checkbox,
	ListItemText,
	Snackbar,
	Alert,
	Typography,
	Tooltip,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import GradientButton from "../components/GradientButton";
import type { User } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";
import supabaseClient from "~/api/supabaseConfig";
import { useRouter } from "next/navigation";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface ProjectIdeaFormProps {
	user: User | null;
	redirectTo?: string;
}

const ProjectIdeaForm: React.FC<ProjectIdeaFormProps> = ({
	user,
	redirectTo,
}) => {
	const router = useRouter();
	const [characterCounter, setCharacterCounter] = useState(0);
	const [projectId, setProjectId] = useState<string | null>(null);
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

			try {
				setLoading(true);
				const { data, error } = await supabaseClient
					.from("Projects")
					.select("*")
					.eq("user_id", user?.id)
					.single(); // Get a single project for the user

				if (error && error.code !== "PGRST116") {
					console.error("Error fetching project details:", error);
					throw error;
				}

				if (data) {
					// Populate fields with existing project data
					setProjectId(data.project_id); // Save project ID for updates
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

		if (user) {
			void fetchProjectDetails();
		}
	}, [user]);

	useEffect(() => {
		setCharacterCounter(tagline.length);
	}, [tagline]);

	const handleSaveProject = async () => {
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
				display: "flex",
				flexDirection: "column",
				gap: "40px",
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
					<Tooltip title="What's the name you want people to remember your project by? Keep it short and memorable." placement="right">
						<InfoOutlinedIcon sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }} />
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
					<Tooltip title="How would you describe your project to someone in an elevator? Focus on the main problem it solves. The limit is 150 characters." placement="right">
						<InfoOutlinedIcon sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }} />
					</Tooltip>
				</Box>
				<TextField
					fullWidth
					multiline
					placeholder="e.g., A web app that helps couples create perfect seating charts for their wedding reception"
					value={tagline}
					onChange={(e) => {
						setTagline(e.target.value);
						setCharacterCounter(e.target.value.length);
					}}
					variant="outlined"
					inputProps={{ maxLength: 150 }}
				/>
				<span style={{ alignSelf: "flex-end", color: "#6C6C80", fontSize: "14px", marginTop: "4px" }}>
					Character Counter: {characterCounter}
				</span>
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
					<Tooltip title="Where can people find your project online? Include your website, GitHub repository, or any other relevant links." placement="right">
						<InfoOutlinedIcon sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }} />
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
					<Tooltip title="Share a video or interactive demo that shows your project in action. Loom videos work great!" placement="right">
						<InfoOutlinedIcon sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }} />
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
					<Tooltip title="What problem does your project solve? Who is it for? How does it work? Include your motivation and technical approach." placement="right">
						<InfoOutlinedIcon sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }} />
					</Tooltip>
				</Box>
				<TextField
					fullWidth
					placeholder="e.g., Seat Magician simplifies wedding planning by automating seating arrangements. It considers relationships, preferences, and table constraints to create optimal seating charts..."
					value={projectDescription}
					onChange={(e) => setProjectDescription(e.target.value)}
					variant="outlined"
					multiline
					rows={3}
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
					<Tooltip title="What specific aspects of your project would you like feedback on? Technical implementation? User experience? Business model?" placement="right">
						<InfoOutlinedIcon sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }} />
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
					<Tooltip title="Select all academic disciplines that your project relates to. This helps match you with relevant feedback." placement="right">
						<InfoOutlinedIcon sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }} />
					</Tooltip>
				</Box>
				<FormControl fullWidth>
					<Select
						multiple
						value={selectedTags}
						onChange={handleTagChange}
						placeholder="Select tags"
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
			</Box>

			<Box
				sx={{ display: "flex", justifyContent: "center" }}
			>
				<GradientButton
					onClick={handleSaveProject}
					content="Edit Project"
					className="w-1/2"
				/>
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
	);
};

export default ProjectIdeaForm;
