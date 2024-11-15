import React, { useState, useEffect } from "react";
import { TextField, InputLabel } from "@mui/material";

const InputField: React.FC<{
	id: string;
	label: string;
	value: string;
	placeholder: string;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ id, label, value, placeholder, handleChange }) => {
	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		handleChange(e);
	};
	return (
		<div className="mb-6">
			<InputLabel
				htmlFor="email"
				sx={{
					mb: 1,
					display: "block",
					fontSize: "0.875rem",
					fontWeight: 500,
					fontFamily: "Outfit",
					color: "text.secondary",
				}}
			>
				{label}
			</InputLabel>
			<TextField
				id={id}
				placeholder={placeholder}
				fullWidth
				value={inputValue}
				onChange={handleInputChange}
				variant="outlined"
				sx={{
					"& .MuiOutlinedInput-root": {
						borderRadius: "6px",
						"& fieldset": {
							borderColor: "grey.300",
						},
						"&:hover fieldset": {
							borderColor: "grey.400",
						},
						"&.Mui-focused fieldset": {
							borderColor: "primary.main",
							borderWidth: "2px",
						},
					},
					"& .MuiOutlinedInput-input": {
						px: 1.5,
						py: 1,
						fontFamily: "Outfit",
					},
				}}
			/>
		</div>
	);
};

export default InputField;
