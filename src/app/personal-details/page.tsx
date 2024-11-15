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
import GradientButton from "../_components/GradientButton";

const PersonalDetailsScreen: React.FC = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [address, setAddress] = useState("");
	const [description, setDescription] = useState("");
	const [workplace, setWorkplace] = useState("");
	const [linkedin, setLinkedin] = useState("");

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

				{/* Avatar Upload */}
				{/* <Box
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
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#F0F0F5",
              border: "2px dashed #D6D6E7",
              "&:hover": {
                backgroundColor: "#E8E8F0",
              },
            }}
          >
            <AddPhotoAlternateIcon
              sx={{ fontSize: "40px", color: "#6C6C80" }}
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
        </Box> */}

				{/* Form Fields */}
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "40px",
						marginBottom: "32px",
						padding: "8px",
					}}
				>
					{/* Name Field */}
					<TextField
						fullWidth
						label="Name*"
						value={name}
						onChange={(e) => setName(e.target.value)}
						variant="outlined"
					/>

					{/* Email Field */}
					<TextField
						fullWidth
						label="Email*"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						variant="outlined"
					/>

					{/* Age Field */}
					<TextField
						fullWidth
						label="Age"
						value={age}
						onChange={(e) => setAge(e.target.value)}
						variant="outlined"
					/>

					{/* Gender Field */}
					<TextField
						fullWidth
						label="Gender"
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						variant="outlined"
					/>

					{/* Address Field */}
					<TextField
						fullWidth
						label="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						variant="outlined"
					/>

					{/* Description Field */}
					<TextField
						fullWidth
						label="What best describes you?"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						variant="outlined"
					/>

					{/* Workplace Field */}
					<TextField
						fullWidth
						label="Where do you work?"
						value={workplace}
						onChange={(e) => setWorkplace(e.target.value)}
						variant="outlined"
					/>

					{/* LinkedIn URL Field */}
					<TextField
						fullWidth
						label="LinkedIn URL*"
						value={linkedin}
						onChange={(e) => setLinkedin(e.target.value)}
						variant="outlined"
					/>
				</Box>

				{/* Next Button */}
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<GradientButton
						onClick={handleNext}
						className="w-1/2"
						content="Next"
					/>
				</Box>
			</Container>
		</Box>
	);
};

export default PersonalDetailsScreen;
