"use client";

import React, { useState, useEffect } from "react";
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
import { AddCircleOutline } from "@mui/icons-material";
import type { SelectChangeEvent } from "@mui/material/Select";
import GradientButton from "../components/GradientButton";
import type { User } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";
import supabaseClient from "~/api/supabaseConfig";
import { useRouter } from "next/navigation";

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
	const [uploads, setUploads] = useState<File[]>([]);
	const [photosVideos, setPhotosVideos] = useState<File[]>([]);
	const [loading, setLoading] = useState(true);
	const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
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

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			const fileList = Array.from(files);
			setUploads((prevUploads) => [...prevUploads, ...fileList].slice(0, 3));
		}
	};

	const handlePhotosVideosChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const files = event.target.files;
		if (files) {
			const fileList = Array.from(files);
			setPhotosVideos((prevPhotosVideos) =>
				[...prevPhotosVideos, ...fileList].slice(0, 3),
			);
		}
	};
	

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
			  .single();
	  
			if (error && error.code !== "PGRST116") {
			  console.error("Error fetching project details:", error);
			  throw error;
			}
	  
			if (data) {
			  // Populate fields with existing project data
			  setProjectId(data.project_id);
			  console.log("Project ID:", data.project_id);
			  setProjectName(data.project_name ?? "");
			  setTagline(data.tagline ?? "");
			  setProjectLink(data.project_url ?? "");
			  setDemoLink(data.demo_link ?? "");
			  setProjectDescription(data.project_description ?? "");
			  setFeedbackQuestion(data.feedback_question ?? "");
			  setSelectedTags(data.tags ?? []);
	  
			  // Fetch files dynamically
			  const { data: folders, error: foldersError } = await supabaseClient
				.storage
				.from("project-files")
				.list(projectId?.trim(),{
					offset: 0,
				  })

			console.log("folders", folders)
		

	  
			  if (foldersError) {
				console.error("Error fetching folders:", foldersError);
			  } else {
				console.log("Folders:", folders.map((folder) => folder.name));
				console.log("Project ID:", projectId?.trim());

	  
				// Find the folder matching the project ID
				const folder = folders.find((folder) => folder.name === projectId?.trim());
				if (folder) {
				  const { data: filesData, error: filesError } = await supabaseClient
					.storage
					.from("project-files")
					.list(projectId?.trim(), { limit: 100, offset: 0 });
	  
				  if (filesError) {
					console.error("Error fetching files:", filesError);
				  } else {
					console.log("Fetched files:", filesData);
					setUploadedFiles(filesData.map((file) => file.name));
				  }
				} else {
				  console.warn(`No folder matches projectId: ${data.project_id}`);
				}
			  }
			}
		  } catch (error) {
			console.error("Error loading project:", error);
		  } finally {
			setLoading(false);
		  }
		};
	  
		if (user) {
		  fetchProjectDetails();
		}
	  }, [user]);
	  

	useEffect(() => {
		setCharacterCounter(tagline.length);
	}, [tagline]);

	const handleSaveProject = async () => {
		if (
			!projectName.trim() ||
			!tagline.trim() ||
			!projectDescription.trim() ||
			!feedbackQuestion.trim() ||
			selectedTags.length === 0
		) {
			setSnackbar({
				open: true,
				message: "Please fill out all mandatory fields.",
				severity: "error",
			});
			return;
		}

		const formData: Database["public"]["Tables"]["Projects"]["Insert"] = {
			user_id: user?.id,
			project_name: projectName,
			tagline: tagline,
			project_url: projectLink || null,
			demo_link: demoLink || null,
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
					.eq("project_id", projectId);

				if (updateError) throw updateError;

				setSnackbar({
					open: true,
					message: "Project updated successfully!",
					severity: "success",
				});

				// Upload files for existing project
				if (photosVideos.length > 0) {
					const promises = photosVideos.map(async (file) => {
						const { error: uploadError } = await supabaseClient.storage
							.from("project-files")
							.upload(`${projectId}/${file.name}`, file);
						if (uploadError) {
							console.error("Error uploading file:", uploadError);
						}
					});

					await Promise.all(promises);
				}
			} else {
				// Insert new project
				const { data, error } = await supabaseClient
					.from("Projects")
					.insert([formData])
					.select();

				if (error) throw error;

				const newProjectId = data?.[0]?.project_id;
				if (!newProjectId) {
					throw new Error("No project ID returned from insert");
				}

				// Upload files for the newly created project
				if (photosVideos.length > 0) {
					const promises = photosVideos.map(async (file) => {
						const { error: uploadError } = await supabaseClient.storage
							.from("project-files")
							.upload(`${newProjectId}/${file.name}`, file);
						if (uploadError) {
							console.error("Error uploading file:", uploadError);
						}
					});

					await Promise.all(promises);
				}

				setProjectId(newProjectId);

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
			<TextField
				fullWidth
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
				onChange={(e) => setProjectDescription(e.target.value)}
				variant="outlined"
				multiline
				rows={3}
			/>

			<TextField
				fullWidth
				label="Feedback Question: What aspect of the project idea needs feedback?*"
				value={feedbackQuestion}
				onChange={(e) => setFeedbackQuestion(e.target.value)}
				variant="outlined"
			/>

			<FormControl fullWidth>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "16px",
						marginTop: "16px",
					}}
				>
					<Box component="label" sx={{ fontSize: "16px", fontWeight: 500 }}>
						Would you like to share any photos or videos?
					</Box>
					<Box sx={{ display: "flex", gap: "16px", justifyContent: "center" }}>
						{Array.from({ length: 3 }, (_, index) => (
							<Box
								key={index}
								sx={{
									width: "100px",
									height: "100px",
									border: "1px dashed #ccc",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
									borderRadius: "8px",
									backgroundSize: "cover",
									backgroundPosition: "center",
									backgroundImage: photosVideos[index]
										? `url(${URL.createObjectURL(photosVideos[index])})`
										: "none",
								}}
								component="label"
							>
								{!photosVideos[index] && (
									<AddCircleOutline sx={{ color: "#666", fontSize: "24px" }} />
								)}
								<input
									type="file"
									accept="image/*,video/*"
									onChange={(e) => {
										const files = e.target.files;
										if (files) {
											const fileList = Array.from(files);
											setPhotosVideos((prev) => {
												const updated = [...prev];
												if (fileList[0]) {
													updated[index] = fileList[0];
												}
												return updated;
											});
										}
									}}
									style={{ display: "none" }}
								/>
							</Box>
						))}
					</Box>
				</Box>
			</FormControl>
			{/* Existing "Would you like to share any photos or videos?" section */}
			{/* ... */}

			{/* New "Uploaded Files" section */}
			<Box sx={{ marginTop: '24px' }}>
			<Box component="label" sx={{ fontSize: '16px', fontWeight: 500 }}>
				Uploaded Files
			</Box>
			{uploadedFiles.length > 0 ? (
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
				{uploadedFiles.map((fileName, index) => (
					<Box
					key={index}
					sx={{
						padding: '8px 16px',
						border: '1px solid #ccc',
						borderRadius: '4px',
						display: 'flex',
						alignItems: 'center',
						gap: '8px'
					}}
					>
					{fileName}
					</Box>
				))}
				</Box>
			) : (
				<Box sx={{ marginTop: '8px', color: '#666' }}>
				No files have been uploaded yet.
				</Box>
			)}
			</Box>


			<FormControl fullWidth>
				<InputLabel>
					What are some tags you would associate with your project idea?*
				</InputLabel>
				<Select
					multiple
					value={selectedTags}
					onChange={handleTagChange}
					label="What are some tags you would associate with your project idea?*"
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
				sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
			>
				<GradientButton
					onClick={handleSaveProject}
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
