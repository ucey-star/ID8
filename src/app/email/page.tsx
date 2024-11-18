import React from "react";
import EmailForm from "~/components/EmailForm";
import Image from "next/image";
import id8Logo from "../../../public/logo/id8.png";

export default function Email() {
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
				<EmailForm />
			</div>
		</div>
	);
}
