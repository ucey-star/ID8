import React from "react";
import ProjectIdeaForm from "../../components/ProjectIdeaForm";
import { createClient } from "~/api/supabaseServerClient";

export default async function ProjectIdeaScreen({
	searchParams,
}: {
	searchParams: { step?: string };
}) {
	const supabaseServer = createClient();
	const {
		data: { user },
	} = await (await supabaseServer).auth.getUser();

	const redirectTo = searchParams?.step === "start-project" ? "/" : "/home";
	return (
		<>
			<ProjectIdeaForm user={user} redirectTo={redirectTo} />
		</>
	);
}
