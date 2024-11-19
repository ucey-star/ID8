import HomeContent from "~/components/HomeContent"; 
import Navbar from "~/components/Navbar";
import { Box} from "@mui/material";
import { createClient } from "~/api/supabaseServerClient";


<<<<<<< HEAD
export default async function Home() {
	const supabaseServer = createClient();
=======
// CardData interface
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
	startupName: string; // Startup name
	feedbackData: FeedbackData[]; // Array of feedback items
}
>>>>>>> main

	const {
		data: { user },
	} = await(await supabaseServer).auth.getUser();

<<<<<<< HEAD
=======
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
			startupName: "MatchMakers",
			feedbackData: [
				{
					id: 1,
					name: "Muhammad Saleh",
					timeAgo: "2 weeks ago",
					feedback:
						"Great user problem focus—make sure it addresses a significant pain point.",
				},
				{
					id: 2,
					name: "Ava Nelson",
					timeAgo: "5 weeks ago",
					feedback:
						"Unique approach! Validate with real users to gauge genuine demand and usability.",
				},
				{
					id: 3,
					name: "Mykhailo Chudyk",
					timeAgo: "7 weeks ago",
					feedback:
						"User onboarding flow will be crucial—ensure simplicity and engagement from the start.",
				},
				{
					id: 4,
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
			startupName: "Matchstick",
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
					id: 5,
					name: "Muhammad Saleh",
					timeAgo: "2 weeks ago",
					feedback:
						"Great user problem focus—make sure it addresses a significant pain point.",
				},
				{
					id: 6,
					name: "Ava Nelson",
					timeAgo: "5 weeks ago",
					feedback:
						"Unique approach! Validate with real users to gauge genuine demand and usability.",
				},
				{
					id: 7,
					name: "Mykhailo Chudyk",
					timeAgo: "7 weeks ago",
					feedback:
						"User onboarding flow will be crucial—ensure simplicity and engagement from the start.",
				},
				{
					id: 8,
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
>>>>>>> main

	return (
		<>
			<Box
				sx={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100%",
					zIndex: 1000,
					background: "var(--color-background-primary)",
					boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
					height: "90px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Navbar />
			</Box>
			<HomeContent user = {user}/>
		</>
	);
}
