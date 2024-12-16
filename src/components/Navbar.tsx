"use client";

import React from "react";
import { User, Home, LogOut, Folder } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import supabaseClient from "~/api/supabaseConfig";
import useMobile from "~/utils/useMobile";

const Navbar: React.FC = () => {
	const router = useRouter();
	const pathname = usePathname();
	const isMobile = useMobile();

	// Function to handle navigation
	const handleNavigation = (path: string) => {
		if (pathname !== path) {
			void router.push(path);
		}
	};

	// Function to handle logout
	const handleLogout = async () => {
		try {
			const { error } = await supabaseClient.auth.signOut();
			if (error) throw error;
			void router.push("/auth/login");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	// Prefetch routes for faster navigation
	useEffect(() => {
		void router.prefetch("/my_projects");
		void router.prefetch("/home");
		void router.prefetch("/notifications");
		void router.prefetch("/personal-details");
	}, [router]);

	// Helper function for link styling
	const linkClasses = (path: string) =>
		`flex ${isMobile ? "flex-col items-center" : "flex-col items-center hover:cursor-pointer"} ${
			pathname === path ? "underline" : ""
		} text-indigo-600`;

	return (
		<nav
			className={`flex ${isMobile ? "justify-between space-x-10 px-6" : "justify-center space-x-16"} bg-transparent ${isMobile ? "py-4" : "py-8"}`}
		>
			<div
				onClick={() => handleNavigation("/my_projects")}
				className={linkClasses("/my_projects")}
			>
				<div
					className={`group flex ${isMobile ? "h-12 w-12" : "h-14 w-14"} items-center justify-center rounded-lg transition-all duration-200 hover:border-2 hover:border-indigo-600`}
				>
					<Folder
						className={`${isMobile ? "h-7 w-7" : "h-8 w-8"} text-indigo-600`} 
						aria-label="My Projects"
					/>
				</div>
				{!isMobile && <p>My Projects</p>}
			</div>
			<div
				onClick={() => handleNavigation("/home")}
				className={linkClasses("/home")}
			>
				<div
					className={`group flex ${isMobile ? "h-12 w-12" : "h-14 w-14"} items-center justify-center rounded-lg transition-all duration-200 hover:border-2 hover:border-indigo-600`}
				>
					<Home
						className={`${isMobile ? "h-7 w-7" : "h-8 w-8"} text-indigo-600`}
						aria-label="Home"
					/>
				</div>
				{!isMobile && <p>Home</p>}
			</div>
			<div
				onClick={() => handleNavigation("/personal-details")}
				className={linkClasses("/personal-details")}
			>
				<div
					className={`group flex ${isMobile ? "h-12 w-12" : "h-14 w-14"} items-center justify-center rounded-lg transition-all duration-200 hover:border-2 hover:border-indigo-600`}
				>
					<User
						className={`${isMobile ? "h-7 w-7" : "h-8 w-8"} text-indigo-600`}
						aria-label="Profile"
					/>
				</div>
				{!isMobile && <p>Profile</p>}
			</div>
			<div
				onClick={handleLogout}
				className={`flex cursor-pointer ${isMobile ? "flex-col items-center" : "flex-col items-center hover:cursor-pointer"} text-indigo-600`}
			>
				<div
					className={`group flex ${isMobile ? "h-12 w-12" : "h-14 w-14"} items-center justify-center rounded-lg transition-all duration-200 hover:border-2 hover:border-indigo-600`}
				>
					<LogOut
						className={`${isMobile ? "h-7 w-7" : "h-8 w-8"} text-indigo-600`}
						aria-label="Logout"
					/>
				</div>
				{!isMobile && <p>Logout</p>}
			</div>
		</nav>
	);
};

export default Navbar;
