import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import Card from "../components/Card";
import ExploreMore from "../components/ExploreMore";
import Feedback from "../components/Feedback";
import { type User } from "@supabase/supabase-js";
import supabaseClient from "~/api/supabaseConfig";
import type { Database } from "~/types/database.types";


interface HomeContentProps {
	user: User;
}


// FeedbackData interface
interface FeedbackData {
	id: number;
	name: string;
	timeAgo: string;
	feedback: string;
}

// CardData interface
interface CardData {
	id: number;
	name: string;
	date: string;
	headline: string;
	descriptionShort: string;
	productLink: string;
	demoLink: string;
	descriptionLong: string;
	feedbackData: FeedbackData[];
}

const HomeContent: React.FC<HomeContentProps> = ({user}) => {
	const [view, setView] = useState<"cards" | "explore">("cards");
	const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
    // we need to fetch all the posted projects and display them in the card components. 
    // we need to pass the comments of each project into the feedback component.



	
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
				justifyContent: "flex-start",
				alignItems: "center",
				background:
					"linear-gradient(135deg, var(--color-background-primary), #E3E7FF, #DCE0FF)",
				fontFamily: "var(--font-family-outfit)",
				padding: "var(--spacing-large)",
				paddingTop: "90px",
			}}
		>
            <Container
                maxWidth="xl"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--spacing-medium)",
                    padding: "var(--spacing-medium)",
                    alignItems: "center",
                }}
            >
                {view === "cards" ? (
                    <>
                        {cardsData.map((card) => (
                            <Card
                                key={card.id}
                                name={username}
                                date={card.date}
                                descriptionShort={card.descriptionShort}
                                headline={card.headline}
                                onExploreMore={() => handleExploreMore(card)}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        {selectedCard && (
                            <>
                                <ExploreMore data={selectedCard} onBack={handleBackToCards} />
                                <Feedback data={selectedCard.feedbackData} />
                            </>
                        )}
                    </>
                )}
            </Container>
		</Box>
	);
};

export default HomeContent;
