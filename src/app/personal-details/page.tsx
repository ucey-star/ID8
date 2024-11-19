import React from "react";
import { Box, Container, Typography } from "@mui/material";
import PersonalDetailsForm from "../../components/PersonalDetailsForm";
import { createClient } from "~/api/supabaseServerClient";

export default async function PersonalDetailsScreen({
	searchParams,
}: {
	searchParams: { step?: string };
}) {
	const supabaseServer = createClient();

	// Fetch user data
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	// Determine redirection based on `step` query parameter
	const redirectTo = searchParams?.step === "complete-profile" ? "/" : "/home";

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
				{/* Header */}
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
					My Profile
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
					This helps others understand who you are when reviewing your ideas.
				</Typography>

				{/* Personal Details Form */}
				<PersonalDetailsForm user={user} redirectTo={redirectTo} />
			</Container>
		</Box>
	);
}
