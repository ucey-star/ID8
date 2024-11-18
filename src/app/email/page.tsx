import React from "react";
import { Mail } from "lucide-react";
import EmailForm from "~/components/EmailForm";

export default function Email() {
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-[#F7F7F8] via-[#E3E7FF] to-[#DCE0FF] p-4">
			<div className="w-full max-w-md rounded-lg border border-solid border-[#5370F7] bg-white px-20 py-12 shadow-xl">
				<div className="mb-8 flex justify-center">
					{/* placeholder for the logo icon*/}
					<Mail className="h-12 w-12 text-indigo-600" />
				</div>

				<h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
					Enter your email
				</h2>
				<EmailForm />
			</div>
		</div>
	);
}
