"use client";

import React from "react";
import { User, Home, Settings, LogOut } from "lucide-react"; // Add Bell icon here I have removed it for now.
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import supabaseClient from "~/api/supabaseConfig"; // Supabase client for logout

const Navbar: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();

	// Function to handle navigation
	const handleNavigation = (path: string) => {
		if (pathname !== path) {
			void router.push(path); // Navigate to the new path
		}
	};
	// Function to handle logout
	const handleLogout = async () => {
		try {
			const { error } = await supabaseClient.auth.signOut(); // Supabase logout function
			if (error) throw error;

			// Redirect to login page after logout
			void router.push("/auth/login");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	// Prefetch routes for faster navigation
	useEffect(() => {
		void router.prefetch("/project_idea");
		void router.prefetch("/home");
		void router.prefetch("/notifications");
		void router.prefetch("/personal-details");
	}, [router]);

	// Helper function for link styling
	const linkClasses = (path: string) =>
		`flex flex-col items-center space-y-1 ${
			pathname === path ? "underline" : ""
		} text-indigo-600`;

	return (
		<nav className="flex justify-center space-x-16 bg-transparent py-8">
			<div
				onClick={() => handleNavigation("/project_idea")}
				className={linkClasses("/project_idea")}
			>
				<div className="group flex h-14 w-14 items-center justify-center rounded-lg transition-all duration-200 hover:border-2 hover:border-indigo-600">
					<Settings className="h-8 w-8 text-indigo-600" aria-label="Project" />
				</div>
				<p>Edit Project</p>
			</div>
			<div
				onClick={() => handleNavigation("/home")}
				className={linkClasses("/home")}
			>
				<div className="group flex h-14 w-14 items-center justify-center rounded-lg transition-all duration-200 hover:border-2 hover:border-indigo-600">
					<Home className="h-8 w-8 text-indigo-600" aria-label="Home" />
				</div>
				<p>Home</p>
			</div>
			{/* <div
				onClick={() => handleNavigation("/notifications")}
				className={linkClasses("/notifications")}
			>
				<div className="group flex h-14 w-14 items-center justify-center rounded-lg transition-all duration-200 hover:border-2 hover:border-indigo-600">
					<Bell
						className="h-8 w-8 text-indigo-600"
						aria-label="Notifications"
					/>
				</div>
				<p>Notifications</p>
			</div> */}
			<div
				onClick={() => handleNavigation("/personal-details")}
				className={linkClasses("/personal-details")}
			>
				<div className="group flex h-14 w-14 items-center justify-center rounded-lg transition-all duration-200 hover:border-2 hover:border-indigo-600">
					<User className="h-8 w-8 text-indigo-600" aria-label="Profile" />
				</div>
				<p>Profile</p>
			</div>
			<div
				onClick={handleLogout} // Call logout function
				className="flex flex-col items-center space-y-1 text-indigo-600 cursor-pointer"
			>
				<div className="group flex h-14 w-14 items-center justify-center rounded-lg transition-all duration-200 hover:border-2 hover:border-indigo-600">
					<LogOut className="h-8 w-8 text-indigo-600" aria-label="Logout" />
				</div>
				<p>Logout</p>
			</div>
		</nav>
	);
};

export default Navbar;
