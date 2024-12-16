import React from "react";
import NewProjectIdea from "../../components/NewProjectIdea";
import { createClient } from "~/api/supabaseServerClient";

export default async function NewProjectIdeaScreen({
	searchParams,
}: {
	searchParams: { redirectTo?: string };
}) {
	const supabaseServer = createClient();
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	// Default redirection if not specified in query params
	const redirectTo = searchParams?.redirectTo ?? "/home";

	return (
		<>
			<NewProjectIdea user={user} redirectTo={redirectTo} />
		</>
	);
}
