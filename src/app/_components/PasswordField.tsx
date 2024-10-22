import React, { useState, useEffect } from "react";
import {
	OutlinedInput,
	InputLabel,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordField: React.FC<{
	content: string;
	value: string;
	label: string;
	showPassword: boolean;
	onTogglePassword: () => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
	value,
	content,
	label,
	showPassword,
	onTogglePassword,
	handleChange,
}) => {
	const [inputValue, setInputValue] = useState(content);

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
			<OutlinedInput
				type={showPassword ? "text" : "password"}
				id="password"
				placeholder={content}
				value={inputValue}
				onChange={handleInputChange}
				fullWidth
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							onClick={onTogglePassword}
							onMouseDown={(e) => e.preventDefault()}
							onMouseUp={(e) => e.preventDefault()}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
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
			></OutlinedInput>
		</div>
	);
};

export default PasswordField;
