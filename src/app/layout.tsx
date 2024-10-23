import "~/styles/globals.css";
import { Outfit } from "next/font/google";

import { type Metadata } from "next";

export const metadata: Metadata = {
	title: "ID8",
	description: "By Founders for Founder",
	icons: [{ rel: "icon", url: "/id8.ico" }],
};

const outfit = Outfit({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800", "900"],
	display: "swap",
	variable: "--font-outfit",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" className={`${outfit.className}`}>
			<body>{children}</body>
		</html>
	);
}
