import React from "react";
import PersonalDetailsForm from "../../components/PersonalDetailsForm";
import { createClient } from "~/api/supabaseServerClient";

export default async function OnboardingScreen({
	searchParams,
}: {
	searchParams: { step?: string };
}) {
	const supabaseServer = createClient();

	// Fetch user data
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	// Determine redirection based on `step` query parameter
	const redirectTo = searchParams?.step === "complete-profile" ? "/" : "/home";

	return (
		<>
			{/* Personal Details Form */}
			<PersonalDetailsForm user={user} redirectTo={redirectTo} />
		</>
	);
}
