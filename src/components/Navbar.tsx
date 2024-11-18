"use client";

import React from "react";
import { User, Home, Bell, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
	const pathname = usePathname();

	const linkClasses = (path: string) =>
		`flex flex-col items-center space-y-1 ${
			pathname === path ? "underline" : ""
		} text-indigo-600`;

	return (
		<nav className="flex justify-center space-x-16 bg-transparent py-8">
			<Link href="/project" className={linkClasses("/project")}>
				<div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-indigo-600">
					<Settings className="h-8 w-8 text-indigo-600" aria-label="Project" />
				</div>
				<p>Project</p>
			</Link>
			<Link href="/home" className={linkClasses("/home")}>
				<div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-indigo-600">
					<Home className="h-8 w-8 text-indigo-600" aria-label="Home" />
				</div>
				<p>Home</p>
			</Link>
			<Link href="/notifications" className={linkClasses("/notifications")}>
				<div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-indigo-600">
					<Bell
						className="h-8 w-8 text-indigo-600"
						aria-label="Notifications"
					/>
				</div>
				<p>Notifications</p>
			</Link>
			<Link
				href="/personal-details"
				className={linkClasses("/personal-details")}
			>
				<div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-indigo-600">
					<User className="h-8 w-8 text-indigo-600" aria-label="Profile" />
				</div>
				<p>Settings</p>
			</Link>
		</nav>
	);
};

export default Navbar;
