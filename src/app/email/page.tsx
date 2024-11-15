"use client";

import React, { useState } from "react";
import GoogleButton from "~/components/GoogleButton";
import InputField from "~/components/InputField";
import GradientButton from "~/components/GradientButton";
import Image from "next/image";
import id8Logo from "../../../public/logo/id8.png";

function Email() {
	const [email, setEmail] = useState("");
	const handleEmail = () => {
		// supabase func for recognizing existing email
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-[#F7F7F8] via-[#E3E7FF] to-[#DCE0FF] p-4">
			<div className="w-full max-w-md rounded-lg border border-solid border-[#5370F7] bg-white px-16 py-12 shadow-xl md:px-20">
				<div className="mb-8 flex justify-center">
					{/* placeholder for the logo icon*/}
					<Image src={id8Logo} alt="ID8 Logo" width={90} height={90} />
				</div>

				<h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
					Enter your email
				</h2>

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
			</div>
		</div>
	);
}

export default Email;
