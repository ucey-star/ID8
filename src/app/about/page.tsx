import React from "react";
import Header from "../../components/Header";

export default function About() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<div className="flex flex-col gap-8 px-32 py-16">
				<h1 className="text-4xl font-bold text-gray-600">About</h1>
				<p className="text-xl font-medium text-gray-600">
					This is the about page
				</p>
			</div>
		</div>
	);
}
