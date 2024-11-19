import HomeContent from "~/components/HomeContent";
import Navbar from "~/components/Navbar";
import { Box } from "@mui/material";
import { createClient } from "~/api/supabaseServerClient";

export default async function Home() {
	const supabaseServer = createClient();

	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

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
			<HomeContent user={user} />
		</>
	);
}
