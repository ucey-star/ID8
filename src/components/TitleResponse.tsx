"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

interface TitleResponseProps {
	title: string;
	response: string;
	link?: boolean;
}

const TitleResponse: React.FC<TitleResponseProps> = ({
	title,
	response,
	link = false,
}) => {
	return (
		<Box sx={{ marginBottom: "var(--spacing-medium)" }}>
			<Typography
				sx={{
					color: "#000000",
					fontWeight: 400,
					fontSize: "20px",
					fontFamily: "var(--font-family-outfit)",
					marginBottom: "4px",
				}}
			>
				{title}
			</Typography>
			{link ? (
				<Typography
					component="a"
					href={response}
					target="_blank"
					rel="noopener noreferrer"
					sx={{
						wordBreak: "break-all",
						color: "#807F7F",
						textDecoration: "underline",
						fontSize: "20px",
						fontWeight: 400,
						fontFamily: "var(--font-family-outfit)",
					}}
				>
					{response}
				</Typography>
			) : (
				<Typography
					sx={{
						color: "#807F7F",
						fontSize: "20px",
						fontWeight: 400,
						fontFamily: "var(--font-family-outfit)",
					}}
				>
					{response}
				</Typography>
			)}
		</Box>
	);
};

export default TitleResponse;
