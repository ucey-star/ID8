import React from "react";
import Link from "next/link";

const Header = () => {
	return (
		<header className="fixed left-0 right-0 top-0 z-50 border-b-2 border-gray-200 bg-white">
			<div className="container mx-auto flex items-center justify-between px-4 py-3">
				<div className="text-xl font-bold text-gray-600">ID8</div>
				<nav>
					<ul className="flex flex-row gap-6">
						<li className="text-gray-600">
							<Link href="/">Home</Link>
						</li>
						<li className="text-gray-600">
							<Link href="/about">About</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Header;
