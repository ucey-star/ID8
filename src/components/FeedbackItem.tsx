"use client";

import React, { useState } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";

import {
	Edit as EditIcon,
	Check as SaveIcon,
	Cancel as CancelIcon,
} from "@mui/icons-material";

interface FeedbackItemProps {
	id: string;
	name: string;
	timeAgo: string;
	feedback: string | null;
	userId: string | null;
	currentUserId: string | null;
	onEditComment: (commentId: string | null, content: string) => void;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({
	id,
	name,
	timeAgo,
	feedback,
	userId,
	currentUserId,
	onEditComment,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editedFeedback, setEditedFeedback] = useState(feedback ?? "");

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleCancelClick = () => {
		setIsEditing(false);
		setEditedFeedback(feedback ?? "");
	};

	const handleSaveClick = async () => {
		console.log(
			"handleSaveClick called with userId:",
			userId,
			"and editedFeedback:",
			editedFeedback,
		);

		if (userId) {
			onEditComment(id, editedFeedback);
			setIsEditing(false);
		} else {
			console.log("userId is null, not calling onEditComment");
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: "4px",
				padding: "var(--spacing-small)",
				backgroundColor: "var(--color-background-paper)",
				borderRadius: "8px",
				border: "1px solid var(--color-border)",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography sx={{ fontWeight: 600 }}>{name}</Typography>
				<Typography variant="body2" color="textSecondary">
					{timeAgo}
				</Typography>
			</Box>
			{isEditing ? (
				<Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
					<TextField
						value={editedFeedback}
						onChange={(e) => setEditedFeedback(e.target.value)}
						fullWidth
						size="small"
					/>
					<IconButton onClick={handleSaveClick} size="small">
						<SaveIcon />
					</IconButton>
					<IconButton onClick={handleCancelClick} size="small">
						<CancelIcon />
					</IconButton>
				</Box>
			) : (
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography>{feedback}</Typography>
					{userId === currentUserId && (
						<IconButton onClick={handleEditClick} size="small">
							<EditIcon />
						</IconButton>
					)}
				</Box>
			)}
		</Box>
	);
};

export default FeedbackItem;
