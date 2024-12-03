import "~/styles/globals.css";
import { Outfit } from "next/font/google";
import { type Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
	title: "ID8",
	description: "By Founders for Founders",
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
			<head>
				{/* Google tag (gtag.js) */}
				<Script
					id="google-analytics"
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-YCR5CFZNMZ"
				/>
				<Script id="google-analytics-init">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							gtag('config', 'G-YCR5CFZNMZ');
					`}
				</Script>

				{/* Hotjar Tracking Code */}
				<Script id="hotjar-tracking" strategy="lazyOnload">
					{`
						(function(h,o,t,j,a,r){
							h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
							h._hjSettings={hjid:5228354,hjsv:6};
							a=o.getElementsByTagName('head')[0];
							r=o.createElement('script');r.async=1;
							r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
							a.appendChild(r);
						})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
					`}
				</Script>
			</head>
			<body>{children}</body>
		</html>
	);
}
