"use client";

import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import supabaseClient from "~/api/supabaseConfig";
import useMobile from "~/utils/useMobile";
import CardComponent from "~/components/Card"; // Existing Card component
import AddProjectCard from "~/components/AddProjectCard";

interface MyProjectsContentProps {
	userId: string;
}

interface CardData {
	id: string;
	name: string;
	date: string;
	headline: string;
	descriptionShort: string;
	tags: string[];
}

const MyProjectsContent: React.FC<MyProjectsContentProps> = ({ userId }) => {
	const [projects, setProjects] = useState<CardData[]>([]);
	const [loading, setLoading] = useState(true);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
        open: false,
        message: "",
    });
    const isMobile = useMobile();
	const router = useRouter();

	useEffect(() => {
		const fetchProjects = async () => {
			setLoading(true);
			try {
				const { data, error } = await supabaseClient
					.from("Projects")
					.select("*")
					.eq("user_id", userId);

				if (error) {
					console.error("Error fetching projects:", error.message);
					return;
				}

				const mappedProjects = (data ?? []).map((project) => ({
					id: project.project_id,
					name: project.project_name ?? "Unknown",
					date: new Date(project.created_at).toLocaleDateString(),
					headline: project.project_name ?? "No Headline",
					descriptionShort: project.tagline ?? "",
					tags: Array.isArray(project.tags) ? project.tags : [],
				}));

				setProjects(mappedProjects);
			} catch (err) {
				console.error("Unexpected error:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects().catch((err) =>
			console.error("Error during fetchProjects:", err),
		);
	}, [userId]);
    const handleDeleteProject = async (projectId: string) => {
        try {
            const { error } = await supabaseClient
                .from("Projects")
                .delete()
                .eq("project_id", projectId);

            if (error) throw error;

            // Remove the project locally
            setProjects((prev) => prev.filter((project) => project.id !== projectId));

            setSnackbar({ open: true, message: "Project deleted successfully!" });
        } catch (error) {
            console.error("Error deleting project:", error);
            setSnackbar({ open: true, message: "Failed to delete project." });
        }
    };
	if (loading) return <Typography>Loading...</Typography>;

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				background: "var(--color-background-primary)",
				padding: isMobile ? "20px" : "40px",
				paddingTop: "90px",
			}}
		>
			<Container maxWidth="lg">
				{/* Title */}
				<Typography
					variant="h4"
					sx={{
						marginBottom: "24px",
						fontWeight: 600,
						textAlign: "center",
					}}
				>
					My Projects
				</Typography>

				{/* Existing Projects */}
				{projects.length > 0 ? (
					projects.map((project, index) => (
						<Box
							key={project.id}
							sx={{
								marginBottom: index === projects.length - 1 ? "0px" : "24px", // 24px spacing except for the last card
							}}
						>
							<CardComponent
								name={project.name}
								date={project.date}
								descriptionShort={project.descriptionShort}
								headline={project.headline}
								tags={project.tags}
								onExploreMore={() =>
									router.push(`/project_idea?projectId=${project.id}`)
								}
								buttonLabel="Edit Project"
                                isDeletable
                                onDelete={() => handleDeleteProject(project.id)}
							/>
						</Box>
					))
				) : (
					<Typography>No projects found.</Typography>
				)}

				{/* Add a Project Card */}
				<Box sx={{ marginTop: "32px" }}>
					<AddProjectCard />
				</Box>

                {/* Snackbar for Feedback */}
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert severity="success" onClose={() => setSnackbar({ ...snackbar, open: false })}>
                        {snackbar.message}
                    </Alert>
                </Snackbar>
			</Container>
		</Box>
	);
};

export default MyProjectsContent;
