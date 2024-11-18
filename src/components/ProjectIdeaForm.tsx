"use client";

import React, { useState } from "react";
import {
	Box,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Checkbox,
	ListItemText,
	Snackbar,
	Alert,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import GradientButton from "../components/GradientButton";
import type { User } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";
import supabaseClient from "~/api/supabaseConfig";

interface ProjectIdeaFormProps {
	user: User | null;
}

const ProjectIdeaForm: React.FC<ProjectIdeaFormProps> = ({ user }) => {
	const [projectName, setProjectName] = useState("");
	const [tagline, setTagline] = useState("");
	const [projectLink, setProjectLink] = useState("");
	const [demoLink, setDemoLink] = useState("");
	const [projectDescription, setProjectDescription] = useState("");
	const [feedbackQuestion, setFeedbackQuestion ] = useState("");
	const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
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

	const handleSaveDraft = async () => {
		const formData: Database["public"]["Tables"]["Projects"]["Insert"] = {
			user_id: user?.id,
			project_name: projectName,
			tagline: tagline,
			project_url: projectLink,
			demo_link: demoLink,
			project_description: projectDescription,
			tags: selectedMajors,
			feedback_question: feedbackQuestion,
			created_at: new Date().toISOString().split("T")[0],
		};

		try {
			const { data, error } = await supabaseClient
				.from("Projects")
				.insert([formData]);

			if (error) throw error;

			setSnackbar({
				open: true,
				message: "Project saved successfully!",
				severity: "success",
			});
			console.log("Data inserted successfully:", data);
		} catch (error) {
			console.error("Error inserting data:", error);
			setSnackbar({
				open: true,
				message: "Error saving project idea. Please try again.",
				severity: "error",
			});
		}
	};

	const handleMajorChange = (event: SelectChangeEvent<string[]>) => {
		const value = event.target.value as unknown as string[];
		setSelectedMajors(value);
	};

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
				value={tagline}
				onChange={(e) => setTagline(e.target.value)}
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
				value={projectDescription}
				onChange={(e) => setProjectDescription(e.target.value)}
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
			/>

			<FormControl fullWidth>
				<InputLabel>
					What are some tags you would associate with your project idea?*
				</InputLabel>
				<Select
					multiple
					value={selectedMajors}
					onChange={handleMajorChange}
					label="What are some tags you would associate with your project idea?*"
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

			<Box
				sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
			>
				<GradientButton
					onClick={handleSaveDraft}
					content="Save"
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
