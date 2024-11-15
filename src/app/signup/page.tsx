"use client";

import React, { useState } from "react";
import GoogleButton from "../_components/GoogleButton";
import InputField from "../_components/InputField";
import GradientButton from "../_components/GradientButton";
import PasswordField from "../_components/PasswordField";
import Link from "next/link";
import Image from "next/image";
import id8Logo from "../../../public/logo/id8.png";
import useMobile from "~/utils/useMobile";

function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const handlePasswordClick = () => {
		setShowPassword(!showPassword);
	};
	const handleSignup = () => {
		// supabase func for signup
	};

	const isMobile = useMobile();

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-[#F7F7F8] via-[#E3E7FF] to-[#DCE0FF] p-4">
			<div className="w-full max-w-md rounded-lg border border-solid border-[#5370F7] bg-white px-16 py-12 shadow-xl md:px-20">
				<div className="mb-8 flex justify-center">
					<Image src={id8Logo} alt="ID8 Logo" width={90} height={90} />
				</div>

				<h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
					Create Account
				</h2>

				<GoogleButton content="Sign up with Google" />

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
					label="Create Password"
					showPassword={showPassword}
					onTogglePassword={handlePasswordClick}
					value={password}
					handleChange={(e) => setPassword(e.target.value)}
				/>

				<GradientButton content="Create Account" onClick={handleSignup} />
				<div className="flex justify-center">
					<span className="mx-auto text-center text-sm text-[#808080]">
						Already have an account? {isMobile && <br />}
						<Link
							className="font-semibold text-[#5370F7] underline"
							href="/login"
						>
							Sign in
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
