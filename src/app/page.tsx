"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Header from "./_components/Header";
import Link from "next/link";
import supabaseClient from "~/api/supabaseConfig";
import type { Database } from "~/types/database.types";

export default function HomePage() {
	const [counter, setCounter] = useState(0);
	const [fetchedText, setFetchedText] = useState<
		Database["public"]["Tables"]["Test_table"]["Row"][]
	>([]);
	function increment() {
		setCounter((prev) => prev + 1);
	}
	function decrement() {
		setCounter((prev) => prev - 1);
	}
	async function fetchTestData(): Promise<void> {
		try {
			const { data, error } = await supabaseClient
				.from("Test_table")
				.select("*");
			if (error) {
				console.log("Error fetching data:", error.message);
			} else {
				setFetchedText(data);
			}
		} catch (err) {
			console.error("An error occurred:", err);
		}
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-slate-400 text-white">
			<div className="container flex flex-row items-center justify-center gap-12 px-4 py-16">
				<Header />
				<Button onClick={increment}>Increment</Button>
				<Button onClick={decrement}>Decrement</Button>
				<Button onClick={fetchTestData}>Fetch Test Data</Button>
			</div>
			<div className="flex flex-col items-center justify-center rounded-2xl bg-slate-500 px-16 py-8">
				{counter}
				<ul>
					{fetchedText.map((item) => (
						<li key={item.id}>Test:{item.Test ?? "No Test data"}</li>
					))}
				</ul>
			</div>
			{/* New Section for Routing. Only added this to facilitate development while we don't have a main page and we want to see the other pages in a easy way. We will remove it later*/}
			<div className="mt-4 flex flex-col items-center justify-center gap-4">
				{/* Link to Guidelines Page */}
				<Link href="/guidelines" passHref>
					<Button variant="contained" color="primary">
						Go to Guidelines
					</Button>
				</Link>
				{/* Link to Personal Details Page */}
				<Link href="/personal-details" passHref>
					<Button variant="contained" color="primary">
						Go to Personal Details
					</Button>
				</Link>
			</div>
			{/* New Section for Routing. Only added this to facilitate development while we don't have a main page and we want to see the other pages in a easy way. We will remove it later*/}
			<div className="mt-4 flex flex-col items-center justify-center gap-4">
				{/* Link to Guidelines Page */}
				<Link href="/guidelines" passHref>
					<Button variant="contained" color="primary">
						Go to Guidelines
					</Button>
				</Link>
				{/* Link to Personal Details Page */}
				<Link href="/personal-details" passHref>
					<Button variant="contained" color="primary">
						Go to Personal Details
					</Button>
				</Link>
			</div>
		</main>
	);
}
