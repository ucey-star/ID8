"use client";

import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    ListItemText,
    SelectChangeEvent,
    IconButton,
    Button,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import GradientButton from "../../components/GradientButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FeedbackItem from "../../components/FeedbackItem";

const EditProjectScreen: React.FC = () => {
    const [projectName, setProjectName] = useState("");
    const [description, setDescription] = useState("");
    const [projectLink, setProjectLink] = useState("");
    const [demoLink, setDemoLink] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [question, setQuestion] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [comments, setComments] = useState<string>("");
    const placeholderFeedback = [
        { id: 1, name: "Muhammad Saleh", feedback: "Great user problem focus—make sure it addresses a significant pain point.", date: "2 weeks ago" },
        { id: 2, name: "Ava Nelson", feedback: "Unique approach! Validate with real users to gauge genuine demand and usability.", date: "5 weeks ago" },
        { id: 3, name: "Mykhailo Chudyk", feedback: "User onboarding flow will be crucial—ensure simplicity and engagement from the start.", date: "7 weeks ago" },
        { id: 4, name: "Matvii Kotelyk", feedback: "Scalability is key. How will you handle growth if user demand spikes?", date: "9 weeks ago" },
    ];

    const handleTagChange = (event: SelectChangeEvent<string[]>) => {
        const value = event.target.value as unknown as string[];
        setSelectedTags(value);
    };

    const handleCommentSubmit = () => {
        console.log("Comment submitted:", comments);
        setComments("");
    };

    const handleSave = () => {
        console.log("Changes saved!");
    };

    return (
        <Box sx={{ minHeight: "100vh", background: "linear-gradient(135deg, #F7F7F8, #E3E7FF, #DCE0FF)", padding: "20px" }}>
            <Navbar />

            {/* Edit Project Section */}
            <Container
                maxWidth="sm"
                sx={{
                    backgroundColor: "#FFFFFF",
                    padding: "32px",
                    borderRadius: "16px",
                    border: "1px solid #D6D6E7",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    marginTop: "40px",
                }}
            >
                <Typography
                    variant="h5"
                    component="h1"
                    sx={{
                        fontWeight: 600,
                        fontSize: "32px",
                        marginBottom: "24px",
                        textAlign: "center",
                    }}
                >
                    Edit Project
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <TextField fullWidth label="Project Name*" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                    <TextField fullWidth label="Describe what your project does in 150 characters or less.*" value={description} onChange={(e) => setDescription(e.target.value)} inputProps={{ maxLength: 150 }} />
                    <TextField fullWidth label="Project Link" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} />
                    <TextField fullWidth label="Demo Link" value={demoLink} onChange={(e) => setDemoLink(e.target.value)} />
                    <TextField fullWidth label="Product Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} multiline rows={3} />
                    <TextField fullWidth label="Is there a question you would like answered?" value={question} onChange={(e) => setQuestion(e.target.value)} />

                    {/* File Upload Section */}
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <input type="file" accept="image/*,video/*" multiple style={{ display: "none" }} id="upload-files" />
                        <label htmlFor="upload-files">
                            <IconButton component="span">
                                <AddPhotoAlternateIcon fontSize="large" />
                            </IconButton>
                        </label>
                    </Box>

                    <FormControl fullWidth>
                        <InputLabel>Tags</InputLabel>
                        <Select multiple value={selectedTags} onChange={handleTagChange} renderValue={(selected) => selected.join(", ")}>
                            {["B2C", "Fintech", "Solo founder", "SaaS", "EdTech", "Gaming", "HealthTech"].map((tag) => (
                                <MenuItem key={tag} value={tag}>
                                    <Checkbox checked={selectedTags.includes(tag)} />
                                    <ListItemText primary={tag} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <GradientButton onClick={handleSave} content="Save" />\
                </Box>

                {/* Feedback Section */}
                <Box sx={{ marginTop: "32px", padding: "24px", borderRadius: "16px", backgroundColor: "#FFFFFF", border: "1px solid #D6D6E7" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: "16px", textAlign: "center" }}>
                        Feedback
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "16px" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <VisibilityIcon />
                            <Typography>22</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <ChatBubbleOutlineIcon />
                            <Typography>4</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <FavoriteBorderIcon />
                            <Typography>12</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ padding: "16px", borderRadius: "12px", border: "1px solid #E0E0E0", backgroundColor: "#F9F9FB" }}>
                        {placeholderFeedback.map((item) => (
                            <FeedbackItem key={item.id} name={item.name} feedback={item.feedback} date={item.date} />
                        ))}
                    </Box>

                    <TextField fullWidth placeholder="Add a comment..." value={comments} onChange={(e) => setComments(e.target.value)} sx={{ marginTop: "16px", borderRadius: "12px" }} />
                    <GradientButton onClick={handleCommentSubmit} content="Send" className="w-full mt-4" />
                </Box>
            </Container>
        </Box>
    );
};

export default EditProjectScreen;
