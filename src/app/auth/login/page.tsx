"use client";

import React from "react";
import GoogleButton from "../../../components/GoogleButton";
// import InputField from "../../../components/InputField";
// import GradientButton from "../../../components/GradientButton";
// import PasswordField from "../../../components/PasswordField";
import Link from "next/link";
import Image from "next/image";
import id8Logo from "../../../../public/logo/id8.png";
import useMobile from "~/utils/useMobile";

function SignIn() {
	// const [email, setEmail] = useState("");
	// const [password, setPassword] = useState("");
	// const [showPassword, setShowPassword] = useState(false);
	// const handlePasswordClick = () => {
	// 	setShowPassword(!showPassword);
	// };

	const isMobile = useMobile();

	// const handleLogin = async () => {
	// 	console.log("login");
	// };
	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-[#F7F7F8] via-[#E3E7FF] to-[#DCE0FF] p-4">
			<div className="w-full max-w-md rounded-lg border border-solid border-[#5370F7] bg-white px-16 py-12 shadow-xl md:px-20">
				<div className="mb-8 flex justify-center">
					{/* placeholder for the logo icon*/}
					<Image src={id8Logo} alt="ID8 Logo" width={90} height={90} />
				</div>

				<h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
					Sign in to ID8
				</h2>

				<GoogleButton content="Sign in with Google" />

				{/* <div className="mb-6 flex items-center">
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

				<GradientButton content="Sign in with Email" onClick={handleLogin} /> */}
				<div className="flex justify-center">
					<span className="mx-auto text-center text-sm text-[#808080]">
						Don&apos;t have an account? {isMobile && <br />}
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

export default SignIn;
