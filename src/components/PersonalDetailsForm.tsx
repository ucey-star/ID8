"use client";

import React, { useState, useEffect } from "react";
import {
	Box,
	Container,
	Typography,
	TextField,
	Snackbar,
	Alert,
	Tooltip,
} from "@mui/material";
import GradientButton from "../components/GradientButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { type User } from "@supabase/supabase-js";
import supabaseClient from "~/api/supabaseConfig";
import type { Database } from "~/types/database.types";
import { useRouter } from "next/navigation";
import useMobile from "~/utils/useMobile";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface PersonalDetailsFormProps {
	user: User | null;
	redirectTo?: string;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({
	user,
	redirectTo,
}) => {
	const router = useRouter();
	const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
	const [gender, setGender] = useState("");
	const [address, setAddress] = useState("");
	const [description, setDescription] = useState("");
	const [workplace, setWorkplace] = useState("");
	const [linkedin, setLinkedin] = useState("");
	const [username, setUsername] = useState("");
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

	const isMobile = useMobile();

	const handleCloseSnackbar = () =>
		setSnackbar((prev) => ({ ...prev, open: false }));

	useEffect(() => {
		const fetchUserDetails = async () => {
			if (!user) {
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const { data, error } = await supabaseClient
					.from("User_Profile")
					.select("*")
					.eq("user_id", user?.id)
					.single();

				if (error && error.code !== "PGRST116") {
					console.error("Error fetching user details:", error);
					throw error;
				}

				if (data) {
					setUsername(data.username ?? "");
					setDateOfBirth(data.DOB ? new Date(data.DOB) : null);
					setGender(data.Gender ?? "");
					setAddress(data.Address ?? "");
					setDescription(data.bio ?? "");
					setWorkplace(data.Place_of_work ?? "");
					setLinkedin(data.linkedin_url ?? "");
				}
			} catch (error) {
				console.error("Error loading user profile:", error);
			} finally {
				setLoading(false);
			}
		};

		if (user) {
			void fetchUserDetails();
		}
	}, [user]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		if (!user) {
			console.warn("User is not logged in.");
			setLoading(false);
			return;
		}

		e.preventDefault();

		const formData: Database["public"]["Tables"]["User_Profile"]["Insert"] = {
			username: username,
			Gender: gender,
			Address: address,
			bio: description,
			Place_of_work: workplace,
			linkedin_url: linkedin,
			DOB: dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : null,
			user_id: user?.id,
		};

		try {
			const { data: existingProfile, error: fetchError } = await supabaseClient
				.from("User_Profile")
				.select("*")
				.eq("user_id", user?.id)
				.single();

			if (fetchError && fetchError.code !== "PGRST116") {
				throw new Error("Error checking existing profile");
			}

			if (existingProfile) {
				const { error: updateError } = await supabaseClient
					.from("User_Profile")
					.update(formData)
					.eq("user_id", user?.id);

				if (updateError) throw updateError;

				setSnackbar({
					open: true,
					message: "Profile updated successfully!",
					severity: "success",
				});
			} else {
				const { error: insertError } = await supabaseClient
					.from("User_Profile")
					.insert([formData]);

				if (insertError) throw insertError;

				setSnackbar({
					open: true,
					message: "Profile created successfully!",
					severity: "success",
				});
			}

			setTimeout(() => {
				router.push(redirectTo ?? "/home");
			}, 1000);
		} catch (error) {
			console.error("Error saving profile:", error);
			setSnackbar({
				open: true,
				message: "Error saving details. Please try again.",
				severity: "error",
			});
		}
	};

	if (loading) {
		return <Box>Loading...</Box>;
	}

	return (
		<>
			<Box
				sx={{
					minHeight: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					background: "linear-gradient(135deg, #F7F7F8, #E3E7FF, #DCE0FF)",
					padding: isMobile ? "20px" : "70px",
				}}
			>
				<Container
					maxWidth="sm"
					sx={{
						backgroundColor: "#FFFFFF",
						padding: isMobile ? "24px" : "48px",
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
					<form onSubmit={handleSubmit}>
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
										Username*
									</Typography>
									<Tooltip
										title="Choose a unique username that will identify you in the community"
										placement="right"
									>
										<InfoOutlinedIcon
											sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
										/>
									</Tooltip>
								</Box>
								<TextField
									fullWidth
									placeholder="e.g., john.doe"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									variant="outlined"
									required
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
										Birth Date
									</Typography>
									<Tooltip
										title="Your date of birth helps us personalize your experience"
										placement="right"
									>
										<InfoOutlinedIcon
											sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
										/>
									</Tooltip>
								</Box>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<DatePicker
										value={dateOfBirth}
										onChange={(newValue) => {
											setDateOfBirth(newValue);
										}}
										sx={{ width: "100%" }}
									/>
								</LocalizationProvider>
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
										Gender
									</Typography>
									<Tooltip title="How do you identify?" placement="right">
										<InfoOutlinedIcon
											sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
										/>
									</Tooltip>
								</Box>
								<TextField
									fullWidth
									placeholder="e.g., Female, Male, Non-binary, Prefer not to say"
									value={gender}
									onChange={(e) => setGender(e.target.value)}
									variant="outlined"
									required
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
										Bio
									</Typography>
									<Tooltip
										title="Tell us about yourself, your interests, and what you're passionate about"
										placement="right"
									>
										<InfoOutlinedIcon
											sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
										/>
									</Tooltip>
								</Box>
								<TextField
									fullWidth
									multiline
									rows={3}
									placeholder="e.g., I'm a software engineer passionate about creating innovative solutions..."
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									variant="outlined"
									required
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
										Workplace
									</Typography>
									<Tooltip
										title="Where do you currently work? This helps build your professional profile"
										placement="right"
									>
										<InfoOutlinedIcon
											sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
										/>
									</Tooltip>
								</Box>
								<TextField
									fullWidth
									placeholder="e.g., Google, Self-employed, Student at Stanford"
									value={workplace}
									onChange={(e) => setWorkplace(e.target.value)}
									variant="outlined"
									required
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
										LinkedIn Profile
									</Typography>
									<Tooltip
										title="Share your LinkedIn profile to connect with other professionals"
										placement="right"
									>
										<InfoOutlinedIcon
											sx={{ fontSize: 16, color: "#6C6C80", cursor: "help" }}
										/>
									</Tooltip>
								</Box>
								<TextField
									fullWidth
									placeholder="e.g., https://www.linkedin.com/in/yourprofile"
									value={linkedin}
									onChange={(e) => setLinkedin(e.target.value)}
									variant="outlined"
									required
								/>
							</Box>
						</Box>

						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<GradientButton
								type="submit"
								content="Save Profile"
								className="w-1/2"
							/>
						</Box>
					</form>

					<Snackbar
						open={snackbar.open}
						autoHideDuration={snackbar.severity === "error" ? 10000 : 1000}
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
				</Container>
			</Box>
		</>
	);
};

export default PersonalDetailsForm;
