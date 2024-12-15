import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import ProjectIdeaForm from "../../components/ProjectIdeaForm";
import { createClient } from "~/api/supabaseServerClient";

export default async function ProjectIdeaScreen({
	searchParams,
}: {
	searchParams: { step?: string };
}) {
	const supabaseServer = createClient();
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	const redirectTo = searchParams?.step === "start-project" ? "/" : "/home";
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
					project. You can view the example entry{" "}
					<a
						href="https://id8.guru/home?id=50e834ba-12d5-466e-8734-42a54487f5a7"
						target="_blank"
						style={{ color: "#9450e0" }}
					>
						here
					</a>
					, along with the type of feedback you can expect.
				</Typography>

				<ProjectIdeaForm user={user} redirectTo={redirectTo} />

				<Link
					href="/home"
					underline="hover"
					sx={{ marginTop: "16px", color: "#6C6C80" }}
				>
					Go back
				</Link>
			</Container>
		</Box>
	);
}
