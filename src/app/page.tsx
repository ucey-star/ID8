"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Header from "./_components/Header";

export default function HomePage() {
	const [counter, setCounter] = useState(0);
	function increment() {
		setCounter((prev) => prev + 1);
	}
	function decrement() {
		setCounter((prev) => prev - 1);
	}
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-slate-400 text-white">
			<div className="container flex flex-row items-center justify-center gap-12 px-4 py-16">
				<Header />
				<Button onClick={increment}>Increment</Button>
				<Button onClick={decrement}>Decrement</Button>
			</div>
			<div className="flex flex-col items-center justify-center rounded-2xl bg-slate-500 px-16 py-8">
				{counter}
			</div>
		</main>
	);
}
