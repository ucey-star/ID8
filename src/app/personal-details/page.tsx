"use client";

import React, { useState } from "react";
import {
	Box,
	Button,
	TextField,
	Container,
	Typography,
	IconButton,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

const PersonalDetailsScreen: React.FC = () => {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [jobTitle, setJobTitle] = useState("");
	const [bio, setBio] = useState("");
	const [linkedin, setLinkedin] = useState("");
	const [aboutMe, setAboutMe] = useState("");

	const handleNext = () => {
		// Form submission logic here
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "linear-gradient(135deg, #F7F7F8, #E3E7FF, #DCE0FF)",
			}}
		>
			<Container
				maxWidth="md"
				sx={{
					backgroundColor: "#FFFFFF",
					padding: "48px",
					borderRadius: "16px",
					border: "1px solid #D6D6E7",
					boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
				}}
			>
				{/* Header */}
				<Typography
					variant="h5"
					component="h1"
					sx={{
						textAlign: "center",
						color: "#000000",
						fontWeight: 600,
						fontSize: "32px",
						lineHeight: "40.32px",
						marginBottom: "24px",
						fontFamily: "'Outfit', sans-serif",
					}}
				>
					Tell Us About Yourself
				</Typography>
				<Typography
					variant="body2"
					sx={{
						textAlign: "center",
						color: "#000000",
						marginBottom: "32px",
						fontSize: "24px",
						lineHeight: "30.24px",
						fontFamily: "'Outfit', sans-serif",
						fontWeight: 200,
					}}
				>
					This helps other founders understand who you are when reviewing your
					ideas.
				</Typography>

				{/* Avatar Upload */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						gap: "32px",
						marginBottom: "32px",
					}}
				>
					<IconButton
						sx={{
							width: "64px",
							height: "64px",
							borderRadius: "50%",
							backgroundColor: "#F0F0F5",
							border: "2px dashed #D6D6E7",
							"&:hover": {
								backgroundColor: "#E8E8F0",
							},
						}}
					>
						<AddPhotoAlternateIcon
							sx={{ fontSize: "32px", color: "#6C6C80" }}
						/>
					</IconButton>
					<Button
						variant="outlined"
						sx={{
							textTransform: "none",
							padding: "12px 36px",
							fontSize: "16px",
							borderColor: "#D6D6E7",
							color: "#6C6C80",
							"&:hover": {
								borderColor: "#C0C0D8",
							},
							fontFamily: "'Outfit', sans-serif",
							fontWeight: 400,
							lineHeight: "20.16px",
						}}
					>
						Upload Photo or Avatar
					</Button>
				</Box>

				{/* Form Fields */}
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "24px",
						marginBottom: "32px",
					}}
				>
					{/* Name Field */}
					<TextField
						fullWidth
						label="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						variant="outlined"
						inputProps={{ maxLength: 600 }}
						sx={{
							fontFamily: "'Outfit', sans-serif",
							fontWeight: 400,
							fontSize: "24px",
							lineHeight: "30.24px",
						}}
					/>

					{/* Username Field */}
					<TextField
						fullWidth
						label="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						variant="outlined"
						inputProps={{ maxLength: 600 }}
						sx={{
							fontFamily: "'Outfit', sans-serif",
							fontWeight: 400,
							fontSize: "24px",
							lineHeight: "30.24px",
						}}
					/>

					{/* Email Field */}
					<TextField
						fullWidth
						label="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						variant="outlined"
						inputProps={{ maxLength: 600 }}
						sx={{
							fontFamily: "'Outfit', sans-serif",
							fontWeight: 400,
							fontSize: "24px",
							lineHeight: "30.24px",
						}}
					/>

					{/* Job Title Field */}
					<TextField
						fullWidth
						label="Job Title"
						value={jobTitle}
						onChange={(e) => setJobTitle(e.target.value)}
						variant="outlined"
						inputProps={{ maxLength: 600 }}
						sx={{
							fontFamily: "'Outfit', sans-serif",
							fontWeight: 400,
							fontSize: "24px",
							lineHeight: "30.24px",
						}}
					/>

					{/* Bio Field */}
					<TextField
						fullWidth
						label="Bio"
						value={bio}
						onChange={(e) => setBio(e.target.value)}
						variant="outlined"
						inputProps={{ maxLength: 600 }}
						sx={{
							fontFamily: "'Outfit', sans-serif",
							fontWeight: 400,
							fontSize: "24px",
							lineHeight: "30.24px",
						}}
					/>

					{/* LinkedIn Field */}
					<TextField
						fullWidth
						label="LinkedIn URL"
						value={linkedin}
						onChange={(e) => setLinkedin(e.target.value)}
						variant="outlined"
						inputProps={{ maxLength: 600 }}
						sx={{
							fontFamily: "'Outfit', sans-serif",
							fontWeight: 400,
							fontSize: "24px",
							lineHeight: "30.24px",
						}}
					/>

					{/* About Me Field */}
					<TextField
						fullWidth
						label="About me"
						value={aboutMe}
						onChange={(e) => setAboutMe(e.target.value)}
						variant="outlined"
						multiline
						rows={3}
						inputProps={{ maxLength: 600 }}
						sx={{
							fontFamily: "'Outfit', sans-serif",
							fontWeight: 400,
							fontSize: "24px",
							lineHeight: "30.24px",
						}}
					/>
				</Box>

				{/* Next Button */}
				<Box sx={{ textAlign: "center" }}>
					<Button variant="contained" className="custom-next-button">
						Next
					</Button>
				</Box>
			</Container>
		</Box>
	);
};

export default PersonalDetailsScreen;
