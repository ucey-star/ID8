"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import FeedbackItem from "./FeedbackItem";
import supabaseClient from "~/api/supabaseConfig";

interface FeedbackData {
    id: string;
    name: string;
    timeAgo: string;
    feedback: string | null;
}

interface FeedbackProps {
    projectId: string;
    userId: string | null;
}

const Feedback: React.FC<FeedbackProps> = ({ projectId, userId }) => {
    const [comment, setComment] = useState("");
    const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
			if (!projectId) {
				console.error("Project ID is undefined or null.");
				return;
			}
			console.log("Fetching comments for project ID:", projectId);
            try {
                const { data: comments, error } = await supabaseClient
                    .from("Comments")
                    .select(`
                        comment_id,
                        content,
                        created_at,
						project_id

                    `)
                    .eq("project_id", projectId)
                    .order("created_at", { ascending: false });

				

                if (error) throw error;

                const mappedComments = comments.map((comment) => ({
                    id: comment.comment_id,
                    name:"Anonymous",
                    timeAgo: new Date(comment.created_at).toLocaleString(),
                    feedback: comment.content,
                }));

                setFeedbackData(mappedComments);
            } catch (error) {
                console.error("Error fetching comments:", error);
                alert("Failed to load comments. Please try again.");
            }
        };

        void fetchComments();
    }, [projectId]);

    const handleAddComment = async () => {
        if (!comment.trim()) {
            alert("Comment cannot be empty!");
            return;
        }
		try {
			// Insert the new comment into the database
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
	
			console.log("New comment added:", newComment);
	
			// Map the new comment to FeedbackData format
			const newFeedbackItem: FeedbackData = {
				id: newComment.comment_id,
				name: "Anonymous", // You can replace this with actual user information if available
				timeAgo: "Just now",
				feedback: newComment.content,
			};
	
			// Update the feedback data with the new comment
			setFeedbackData((prev) => [newFeedbackItem, ...prev]);
	
			// Clear the input field
			setComment("");
		} catch (error) {
			console.error("Error adding comment:", error);
			alert("Failed to add comment. Please try again.");
		}

        try {
			const { data: comments, error } = await supabaseClient
				.from("Comments")
				.select("comment_id, content, created_at, project_id, user_id")
				.eq("project_id", projectId)
				.order("created_at", { ascending: false });
	
			if (error) throw error;
	
			console.log("Fetched comments:", comments);
	
			const mappedComments = comments.map((comment) => ({
				id: comment.comment_id,
				name: "Anonymous", // You can replace this with user data if needed
				timeAgo: new Date(comment.created_at).toLocaleString(),
				feedback: comment.content,
			}));
	
			setFeedbackData(mappedComments);
		} catch (error) {
			console.error("Error fetching comments:", error);
			alert("Failed to load comments. Please try again.");
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
                fontFamily: "var(--font-family-outfit)",
            }}
        >
            <Typography
                sx={{
                    fontFamily: "var(--font-family-outfit)",
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
                            key={item.id}
                            name={item.name}
                            timeAgo={item.timeAgo}
                            feedback={item.feedback}
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
                    fontFamily: "var(--font-family-outfit)",
                    fontSize: "16px",
                    marginBottom: "var(--spacing-small)",
                }}
            />

            <Button
                variant="contained"
                className="custom-next-button"
                onClick={handleAddComment}
                sx={{
                    width: "fit-content",
                    minWidth: "120px",
                    padding: "var(--spacing-small) var(--spacing-medium)",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                    fontFamily: "var(--font-family-outfit)",
                    fontSize: "14px",
                    color: "#FFFFFF",
                }}
            >
                Send
            </Button>
        </Box>
    );
};

export default Feedback;
