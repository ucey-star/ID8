"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import FeedbackItem from "./FeedbackItem";
import supabaseClient from "~/api/supabaseConfig";
import GradientButton from "../components/GradientButton";

interface FeedbackData {
	id: string;
	name: string;
	timeAgo: string;
	feedback: string | null;
	userId: string | null;
}

interface FeedbackProps {
	projectId: string;
	userId: string | null;
}

const Feedback: React.FC<FeedbackProps> = ({ projectId, userId }) => {
	const [comment, setComment] = useState("");
	const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);

	// Reusable function for fetching and mapping comments
	const fetchAndMapComments = async () => {
		try {
			const { data: comments, error } = await supabaseClient
				.from("Comments")
				.select("comment_id, content, created_at, user_id, project_id")
				.eq("project_id", projectId)
				.order("created_at", { ascending: false });

			if (error) throw error;

			const userIds = [
				...new Set((comments ?? []).map((comment) => comment.user_id)),
			];

			const { data: userProfiles, error: userProfilesError } =
				await supabaseClient
					.from("User_Profile")
					.select("user_id, username")
					.in("user_id", userIds);

			if (userProfilesError) throw userProfilesError;

			const userMap = userProfiles.reduce<Record<string, string>>(
				(map, user) => {
					map[user.user_id] = user.username ?? "Anonymous";
					return map;
				},
				{},
			);

			const mappedComments = comments.map((comment) => ({
				id: comment.comment_id,
				name: comment.user_id
					? (userMap[comment.user_id] ?? "Anonymous")
					: "Anonymous",
				timeAgo: new Date(comment.created_at).toLocaleString(),
				feedback: comment.content,
				userId: comment.user_id,
			}));

			setFeedbackData(mappedComments);
		} catch (error) {
			console.error("Error fetching comments:", error);
			alert("Failed to load comments. Please try again.");
		}
	};

	useEffect(() => {
		void (async () => {
			try {
				if (projectId) {
					await fetchAndMapComments();
				}
			} catch (error) {
				console.error("Error in useEffect:", error);
			}
		})();
	}, [projectId]);

	const handleAddComment = async () => {
		if (!comment.trim()) {
			alert("Comment cannot be empty!");
			return;
		}
		try {
			const { data: newComment, error } = await supabaseClient
				.from("Comments")
				.insert({
					project_id: projectId,
					user_id: userId,
					content: comment,
				})
				.select("*")
				.single();

			if (error) throw error;

			setComment("");
			await fetchAndMapComments(); // Reuse the same function
		} catch (error) {
			console.error("Error adding comment:", error);
			alert("Failed to add comment. Please try again.");
		}
	};

	const handleEditComment = async (
		commentId: string | null,
		content: string,
	) => {
		if (!commentId) return;

		try {
			const { error } = await supabaseClient
				.from("Comments")
				.update({ content })
				.eq("comment_id", commentId);

			if (error) throw error;

			setFeedbackData((prevData) =>
				prevData.map((item) =>
					item.id === commentId ? { ...item, feedback: content } : item,
				),
			);
		} catch (error) {
			console.error("Error editing comment:", error);
			alert("Failed to edit comment. Please try again.");
		}
	};

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: "500px",
				backgroundColor: "var(--color-background-paper)",
				padding: "var(--spacing-large)",
				borderRadius: "16px",
				border: `1px solid var(--color-border)`,
				boxShadow: "var(--box-shadow)",
				display: "flex",
				flexDirection: "column",
				gap: "var(--spacing-medium)",
				alignItems: "center",
				fontFamily: "Outfit, sans-serif",
			}}
		>
			<Typography
				sx={{
					fontFamily: "Outfit, sans-serif",
					fontSize: "28px",
					fontWeight: 600,
					lineHeight: "36px",
					textAlign: "center",
					color: "var(--color-text-primary)",
					marginBottom: "var(--spacing-large)",
				}}
			>
				Feedback
			</Typography>

			<Box
				sx={{
					width: "100%",
					maxHeight: "300px",
					overflowY: "auto",
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-small)",
					border: "1px solid var(--color-border)",
					borderRadius: "8px",
					padding: "var(--spacing-small)",
					scrollBehavior: "smooth",
				}}
			>
				{feedbackData.length > 0 ? (
					feedbackData.map((item) => (
						<FeedbackItem
							id={item.id}
							key={item.id}
							name={item.name}
							timeAgo={item.timeAgo}
							feedback={item.feedback}
							userId={item.userId}
							currentUserId={userId}
							onEditComment={handleEditComment}
						/>
					))
				) : (
					<Typography>No comments yet.</Typography>
				)}
			</Box>

			<TextField
				placeholder="Add a comment"
				variant="outlined"
				fullWidth
				value={comment}
				onChange={(e) => setComment(e.target.value)}
				sx={{
					fontFamily: "Outfit, sans-serif",
					fontSize: "16px",
					marginBottom: "var(--spacing-small)",
				}}
			/>

			<GradientButton
				onClick={handleAddComment}
				content="SEND"
				className="w-full"
			/>
		</Box>
	);
};

export default Feedback;
