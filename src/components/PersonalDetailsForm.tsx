"use client";
import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
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
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ user }) => {
    const router = useRouter();
	const [dateOfBirth, setDateOfBirth] = useState<Date | null >(null);
	const [gender, setGender] = useState("");
	const [address, setAddress] = useState("");
	const [description, setDescription] = useState("");
	const [workplace, setWorkplace] = useState("");
	const [linkedin, setLinkedin] = useState("");
    const [username, setUsername] = useState("")

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
			const { data, error } = await supabaseClient
				.from("User_Profile")
				.insert([formData]);

			if (error) throw error;
            else{
                console.log("Data inserted successfully:", data);
                router.push("/home");
            }

		} catch (error) {
			console.error("Error inserting data:", error);
			alert("Error saving personal details. Please try again.");
		}
	};

	return (
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
					label="username"
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
					label="LinkedIn URL*"
					value={linkedin}
					onChange={(e) => setLinkedin(e.target.value)}
					variant="outlined"
					required
				/>
			</Box>
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<GradientButton type="submit" className="w-1/2" content="Save" />
			</Box>
		</form>
	);
};

export default PersonalDetailsForm;
