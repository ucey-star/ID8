"use client";

import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import Card from "../components/Card";
import ExploreMore from "../components/ExploreMore";
import Feedback from "../components/Feedback";
import { type User } from "@supabase/supabase-js";
import supabaseClient from "~/api/supabaseConfig";
import useMobile from "~/utils/useMobile";

interface HomeContentProps {
	user: User | null;
}

interface FeedbackData {
	id: number;
	name: string;
	timeAgo: string;
	feedback: string;
}

interface CardData {
	id: string;
	name: string;
	date: string;
	headline: string;
	descriptionShort: string;
	productLink: string;
	demoLink: string;
	tags: string[];
	descriptionLong: string;
	feedbackQuestion: string;
	feedbackData: FeedbackData[];
}

const HomeContent: React.FC<HomeContentProps> = ({ user }) => {
	const [view, setView] = useState<"cards" | "explore">("cards");
	const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
	const [myProjects, setMyProjects] = useState<CardData[]>([]);
	const [otherProjects, setOtherProjects] = useState<CardData[]>([]);
	const [loading, setLoading] = useState(true);
	const isMobile = useMobile();

	const handleExploreMore = (card: CardData) => {
		console.log("Selected card ID:", card.id);
		setSelectedCard(card);
		setView("explore");
	};

	const handleBackToCards = () => {
		setView("cards");
		setSelectedCard(null);
	};

	useEffect(() => {
		const fetchProjects = async () => {
			if (!user) {
				console.warn("User is not logged in.");
				setLoading(false);
				return;
			}

			setLoading(true);
			try {
				const myProjectsResponse = await supabaseClient
					.from("Projects")
					.select("*")
					.eq("user_id", user.id);

				const otherProjectsResponse = await supabaseClient
					.from("Projects")
					.select("*")
					.neq("user_id", user.id);

				if (myProjectsResponse.error ?? otherProjectsResponse.error) {
					console.error("Error fetching projects");
				} else {
					const mappedMyProjects = (myProjectsResponse.data ?? []).map(
						(project) => ({
							id: project.project_id,
							name: project.project_name ?? "Unknown",
							date: new Date(project.created_at).toLocaleDateString(),
							headline: project.project_name ?? "No Headline",
							descriptionShort: project.tagline ?? "",
							productLink: project.project_url ?? "",
							demoLink: project.demo_link ?? "",
							descriptionLong: project.project_description ?? "",
							feedbackQuestion: project.feedback_question ?? "",
							tags: Array.isArray(project.tags)
								? project.tags
								: project.tags
									? [project.tags]
									: [],
							feedbackData: [],
						}),
					);

					const mappedOtherProjects = (otherProjectsResponse.data ?? []).map(
						(project) => ({
							id: project.project_id,
							name: project.project_name ?? "Unknown",
							date: new Date(project.created_at).toLocaleDateString(),
							headline: project.project_name ?? "No Headline",
							descriptionShort: project.tagline ?? "",
							productLink: project.project_url ?? "",
							demoLink: project.demo_link ?? "",
							descriptionLong: project.project_description ?? "",
							feedbackQuestion: project.feedback_question ?? "",
							tags: Array.isArray(project.tags)
								? project.tags
								: project.tags
									? [project.tags]
									: [],
							feedbackData: [],
						}),
					);

					setMyProjects(mappedMyProjects);
					setOtherProjects(mappedOtherProjects);
				}
			} catch (error) {
				console.error("Error fetching projects:", error);
			} finally {
				setLoading(false);
			}
		};

		void fetchProjects();
	}, [user]);

	if (loading) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-start",
				alignItems: "center",
				background:
					"linear-gradient(135deg, var(--color-background-primary), #E3E7FF, #DCE0FF)",
				fontFamily: "var(--font-family-outfit)",
				padding: isMobile ? "var(--spacing-small)" : "var(--spacing-large)",
				paddingTop: "90px",
			}}
		>
			{view === "cards" ? (
				<>
					{/* My Projects Section */}
					<Container
						maxWidth={false}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: "var(--spacing-medium)",
							padding: isMobile
								? "var(--spacing-small)"
								: "var(--spacing-medium)",
							alignItems: "center",
							width: "100%",
							marginTop: "40px",
							marginX: isMobile ? "0" : "auto",
						}}
					>
						<Typography
							variant="h4"
							sx={{
								marginBottom: "16px",
								fontSize: isMobile ? "1.5rem" : "2rem",
							}}
						>
							My Project
						</Typography>
						{myProjects.length > 0 ? (
							myProjects.map((card) => (
								<Card
									key={card.id}
									name={card.name}
									date={card.date}
									descriptionShort={card.descriptionShort}
									headline={card.headline}
									tags={card.tags}
									onExploreMore={() => handleExploreMore(card)}
								/>
							))
						) : (
							<Typography>No projects found.</Typography>
						)}
					</Container>

					{/* Other Projects Section */}
					<Container
						maxWidth={false}
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: "var(--spacing-medium)",
							padding: isMobile
								? "var(--spacing-small)"
								: "var(--spacing-medium)",
							alignItems: "center",
							width: "100%",
							marginX: isMobile ? "0" : "auto",
						}}
					>
						<Typography
							variant="h4"
							sx={{
								marginBottom: "16px",
								fontSize: isMobile ? "1.5rem" : "2rem",
							}}
						>
							Other Projects
						</Typography>
						{otherProjects.length > 0 ? (
							otherProjects.map((card) => (
								<Card
									key={card.id}
									name={card.name}
									date={card.date}
									descriptionShort={card.descriptionShort}
									headline={card.headline}
									tags={card.tags}
									onExploreMore={() => handleExploreMore(card)}
								/>
							))
						) : (
							<Typography>No other projects found.</Typography>
						)}
					</Container>
				</>
			) : (
				selectedCard && (
					<>
						<ExploreMore data={selectedCard} onBack={handleBackToCards} />
						<Feedback projectId={selectedCard.id} userId={user?.id ?? null} />
					</>
				)
			)}
		</Box>
	);
};

export default HomeContent;
