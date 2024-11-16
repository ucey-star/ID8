"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import GoogleButton from "../../../components/GoogleButton";
import InputField from "../../../components/InputField";
import GradientButton from "../../../components/GradientButton";
import PasswordField from "../../../components/PasswordField";
import Link from "next/link";

function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const handlePasswordClick = () => {
		setShowPassword(!showPassword);
	};

	const handleLogin = async () => {
		console.log("login");
	};
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-[#F7F7F8] via-[#E3E7FF] to-[#DCE0FF] p-4">
			<div className="w-full max-w-md rounded-lg border border-solid border-[#5370F7] bg-white px-20 py-12 shadow-xl">
				<div className="mb-8 flex justify-center">
					{/* placeholder for the logo icon*/}
					<Mail className="h-12 w-12 text-indigo-600" />
				</div>

				<h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
					Sign in to ID8
				</h2>

				<GoogleButton content="Sign in with Google" />

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
				<PasswordField
					content="●●●●●●●●"
					label="Password"
					showPassword={showPassword}
					onTogglePassword={handlePasswordClick}
					value={password}
					handleChange={(e) => setPassword(e.target.value)}
				/>

				<GradientButton content="Sign in with Email" onClick={handleLogin} />
				<div className="flex justify-center">
					<span className="mx-auto text-center text-sm text-[#808080]">
						Don&apos;t have an account?{" "}
						<Link
							className="font-semibold text-[#5370F7] underline"
							href="/auth/signup"
						>
							Sign up
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
