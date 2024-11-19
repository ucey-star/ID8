"use client";

import React, { useState, useEffect } from "react";
import { Box, TextField, Snackbar, Alert } from "@mui/material";
import GradientButton from "../components/GradientButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { type User } from "@supabase/supabase-js";
import supabaseClient from "~/api/supabaseConfig";
import type { Database } from "~/types/database.types";
import { useRouter } from "next/navigation";

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

	const handleCloseSnackbar = () =>
		setSnackbar((prev) => ({ ...prev, open: false }));

	useEffect(() => {
		const fetchUserDetails = async () => {
			if (!user) {
				console.warn("User is not logged in.");
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
					// Populate the form with existing details
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
			// Check if the user profile already exists
			const { data: existingProfile, error: fetchError } = await supabaseClient
				.from("User_Profile")
				.select("*")
				.eq("user_id", user?.id)
				.single();

			if (fetchError && fetchError.code !== "PGRST116") {
				throw new Error("Error checking existing profile");
			}

			if (existingProfile) {
				// Update existing profile
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
				// Create new profile
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

			// Trigger the onSave callback or navigate to "/home"
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
					<TextField
						fullWidth
						label="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						variant="outlined"
					/>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DatePicker
							label="Date of Birth"
							value={dateOfBirth}
							onChange={(newValue) => {
								setDateOfBirth(newValue);
							}}
						/>
					</LocalizationProvider>
					<TextField
						fullWidth
						label="Gender"
						value={gender}
						onChange={(e) => setGender(e.target.value)}
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="What best describes you?"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="Where do you work?"
						value={workplace}
						onChange={(e) => setWorkplace(e.target.value)}
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="LinkedIn URL"
						value={linkedin}
						onChange={(e) => setLinkedin(e.target.value)}
						variant="outlined"
					/>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "center" }}>
					<GradientButton type="submit" className="w-1/2" content="Save" />
				</Box>
			</form>

			{/* Snackbar for notifications */}
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
		</>
	);
};

export default PersonalDetailsForm;
