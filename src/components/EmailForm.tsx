"use client";

import { useState } from "react";
import GoogleButton from "./GoogleButton";
import InputField from "./InputField";
import GradientButton from "./GradientButton";

export default function EmailForm() {
	const [email, setEmail] = useState("");
	const handleEmail = () => {
		// supabase func for recognizing existing email
	};
	return (
		<>
			<GoogleButton content="Continue with Google" />

			<div className="mb-6 flex items-center">
				<div className="flex-grow border-t border-gray-300"></div>
				<span className="mx-4 flex-shrink text-gray-600">OR</span>
				<div className="flex-grow border-t border-gray-300"></div>
			</div>

			<InputField
				id="email"
				label="Email address"
				placeholder="you@example.com"
				value={email}
				handleChange={(e) => setEmail(e.target.value)}
			/>
			<GradientButton content="Continue" onClick={handleEmail} />
		</>
	);
}
