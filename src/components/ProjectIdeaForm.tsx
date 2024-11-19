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

const ProjectIdeaForm: React.FC<ProjectIdeaFormProps> = ({ user, redirectTo }) => {
    const router = useRouter();
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
                    setProjectName(data.project_name || "");
                    setTagline(data.tagline || "");
                    setProjectLink(data.project_url || "");
                    setDemoLink(data.demo_link || "");
                    setProjectDescription(data.project_description || "");
                    setFeedbackQuestion(data.feedback_question || "");
                    setSelectedTags(data.tags || []);
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

                setProjectId(data[0]?.project_id || null); // Save the new project ID for future updates
                setSnackbar({
                    open: true,
                    message: "Project created successfully!",
                    severity: "success",
                });
            }

            // Redirect after saving
            setTimeout(() => {
                router.push(redirectTo || "/home");
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
