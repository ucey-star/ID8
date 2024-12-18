import React from "react";
import Onboarding from "~/components/Onboarding";
import { createClient } from "~/api/supabaseServerClient";
import { redirect } from "next/navigation";
import supabaseClient from "~/api/supabaseConfig";

export default async function OnboardingScreen() {
	const supabaseServer = createClient();

	// Fetch the current user
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	// Redirect to login if no user
	if (!user) {
		redirect("/auth/login");
	}

	// Check user progress: Fetch profile and project details
	const { data: userProfile } = await supabaseClient
		.from("User_Profile")
		.select("username, bio")
		.eq("user_id", user.id)
		.single();

	const { data: project } = await supabaseClient
		.from("Projects")
		.select("project_name, project_description")
		.eq("user_id", user.id)
		.single();

	// Determine if onboarding is complete
	const isProfileComplete = !!(
        userProfile?.username && userProfile?.bio
    );
	const isProjectComplete = !!(
        project?.project_name && project?.project_description
    );

	// Redirect to home if onboarding is complete
	if (isProfileComplete && isProjectComplete) {
		redirect("/home");
	}

	// Show Onboarding page if onboarding is not complete
	return (
		<>
			<Onboarding
                user={user}
                isProfileComplete={isProfileComplete}
                isProjectComplete={isProjectComplete}
            />
		</>
	);
}
