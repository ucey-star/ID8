"use client";
import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import Card from "../../components/Card";
import ExploreMore from "../../components/ExploreMore";
import Feedback from "../../components/Feedback";

// FeedbackData interface - ensure alignment with backend feedback schema
interface FeedbackData {
	name: string; // Feedback author
	timeAgo: string; // Time since feedback
	feedback: string; // Feedback content
}

// CardData interface - ensure fields match backend schema for consistency
interface CardData {
	id: number; // Unique card ID
	name: string; // Associated name
	date: string; // Creation date
	views: number; // View count
	comments: number; // Comment count
	likes: number; // Like count
	headline: string; // Card headline
	descriptionShort: string; // Short description
	productLink: string; // Product URL
	demoLink: string; // Demo URL
	descriptionLong: string; // Full description
	feedbackData: FeedbackData[]; // Array of feedback items
}
}

export default function Home() {
	const [view, setView] = useState<"cards" | "explore">("cards");
	const [selectedCard, setSelectedCard] = useState<CardData | null>(null);

	const cardsData: CardData[] = [
		{
			id: 1,
			name: "Muhammad Saleh",
			date: "December 06, 2024",
			views: 123,
			comments: 456,
			likes: 789,
			headline: "Saleh’s Startup Idea",
			descriptionShort: "Mobile App for Matchmakers",
			productLink: "https://www.facebook.com/groups/2689639201174278/",
			demoLink: "https://youtu.be/qL7zrWcv6XY?feature=shared",
			descriptionLong:
				"Matchstick is a mobile app that addresses the challenges faced by matchmakers in their work...",
			feedbackData: [
				{
					name: "Muhammad Saleh",
					timeAgo: "2 weeks ago",
					feedback:
						"Great user problem focus—make sure it addresses a significant pain point.",
				},
				{
					name: "Ava Nelson",
					timeAgo: "5 weeks ago",
					feedback:
						"Unique approach! Validate with real users to gauge genuine demand and usability.",
				},
				{
					name: "Mykhailo Chudyk",
					timeAgo: "7 weeks ago",
					feedback:
						"User onboarding flow will be crucial—ensure simplicity and engagement from the start.",
				},
				{
					name: "Matviy Kotolyk",
					timeAgo: "9 weeks ago",
					feedback:
						"Scalability is key. How will you handle growth if user demand spikes?",
				},
			],
		},
		{
			id: 2,
			name: "Muhammad Saleh",
			date: "December 06, 2024",
			views: 123,
			comments: 456,
			likes: 789,
			headline: "Saleh’s Startup Idea",
			descriptionShort: "Mobile App for Matchmakers",
			productLink: "https://www.facebook.com/groups/2689639201174278/",
			demoLink: "https://youtu.be/qL7zrWcv6XY?feature=shared",
			descriptionLong:
				"Matchstick is a mobile app that addresses the challenges faced by matchmakers in their work...",
			feedbackData: [
				{
					name: "Muhammad Saleh",
					timeAgo: "2 weeks ago",
					feedback:
						"Great user problem focus—make sure it addresses a significant pain point.",
				},
				{
					name: "Ava Nelson",
					timeAgo: "5 weeks ago",
					feedback:
						"Unique approach! Validate with real users to gauge genuine demand and usability.",
				},
				{
					name: "Mykhailo Chudyk",
					timeAgo: "7 weeks ago",
					feedback:
						"User onboarding flow will be crucial—ensure simplicity and engagement from the start.",
				},
				{
					name: "Matviy Kotolyk",
					timeAgo: "9 weeks ago",
					feedback:
						"Scalability is key. How will you handle growth if user demand spikes?",
				},
			],
		},
	];

	const handleExploreMore = (card: CardData) => {
		setSelectedCard(card);
		setView("explore");
	};

	const handleBackToCards = () => {
		setView("cards");
		setSelectedCard(null);
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				background:
					"linear-gradient(135deg, var(--color-background-primary), #E3E7FF, #DCE0FF)",
				fontFamily: "var(--font-family-outfit)",
				padding: "var(--spacing-large)",
			}}
		>
			<Box sx={{ position: "absolute", top: "20px", left: "20px" }}>
				{/* Insert the logo here */}
			</Box>

			<Box sx={{ width: "100%", mb: "var(--spacing-medium)" }}>
				{/* Placeholder for the Navigation component */}
			</Box>

			<Container
				maxWidth="md"
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "var(--spacing-medium)",
					alignItems: "center",
					padding: "var(--spacing-medium)",
				}}
			>
				{view === "cards" ? (
					<>
						{cardsData.map((card) => (
							<Card
								key={card.id}
								name={card.name}
								date={card.date}
								views={card.views}
								comments={card.comments}
								likes={card.likes}
								onExploreMore={() => handleExploreMore(card)}
							/>
						))}
					</>
				) : (
					<>
						{selectedCard && (
							<>
								<ExploreMore data={selectedCard} onBack={handleBackToCards} />
								<Feedback
									views={selectedCard.views}
									comments={selectedCard.comments}
									likes={selectedCard.likes}
									data={selectedCard.feedbackData}
								/>
							</>
						)}
					</>
				)}
			</Container>
		</Box>
	);
}
