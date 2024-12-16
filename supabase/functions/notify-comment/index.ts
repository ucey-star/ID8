/* eslint-disable */
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import notificationapi from "npm:notificationapi-node-server-sdk";
import type { Database } from "../../../src/types/database.types";
import { createClient } from "npm:@supabase/supabase-js@2";

// Initialize the notification API
notificationapi.init(
	Deno.env.get("NOTIFICATION_API_CLIENT_ID"),
	Deno.env.get("NOTIFICATION_API_CLIENT_SECRET"),
);

const supabase = createClient(
	Deno.env.get("SUPABASE_URL"),
	Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
);

type CommentRecord = Database["public"]["Tables"]["comments"]["Row"];
interface CommentsPayload {
	type: "INSERT" | "UPDATE" | "DELETE";
	record: CommentRecord;
	schema: "public";
}

console.log("Hello from the 'send-comment-notification' Edge Function!");

Deno.serve(async (req) => {
	try {
		const comment: CommentsPayload = await req.json();
		const { project_id, owner } = comment.record;
		if (owner === true) {
			console.log("Comment made by the owner. No notification sent.");
			return new Response(
				JSON.stringify({
					message: "No notification sent.Owner made the comment",
				}),
				{
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		const { data: projectData, error: projectError } = await supabase
			.from("Projects")
			.select("*")
			.eq("project_id", project_id)
			.single();

		if (projectError || !projectData) {
			throw new Error(`Failed to fetch project data: ${projectError?.message}`);
		}

		const user_id = projectData.user_id;

		// fetch user email
		const { data: userData, error: userError } =
			await supabase.auth.admin.getUserById(user_id);

		const email = userData?.user?.email;
		if (userError || !email) {
			throw new Error(`Failed to fetch user email: ${userError?.message}`);
		}

		// Email notification logic block
		await notificationapi.send({
			notificationId: "new_feedback_on_your_project_",
			user: {
				id: email,
				email: email,
			},
		});

		// Return success response
		return new Response(JSON.stringify({ message: `Email sent to ${email}` }), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Failed to send notification:", error);
		return new Response(
			JSON.stringify({
				error: "Failed to send notification",
				details: error.message,
			}),
			{ status: 500, headers: { "Content-Type": "application/json" } },
		);
	}
});
