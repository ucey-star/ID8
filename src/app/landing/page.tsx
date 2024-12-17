"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import LandingButton from "~/components/LandingButton";
import Logo from "~/../public/logo/id8.png";
import { useRouter, usePathname } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const pathname = usePathname();

	// Function to handle navigation
	const handleNavigation = (path: string) => {
		if (pathname !== path) {
			void router.push(path);
		}
	};
	return (
		<main className="min-h-screen">
			{/* Navigation */}
			<nav className="fixed z-50 w-full border-b bg-white/80 backdrop-blur-sm">
				<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
					<Image src={Logo} alt="ID8 Logo" width={40} height={40} />
					<LandingButton
						content="Sign In"
						variant="secondary"
						onClick={() => handleNavigation("/auth/login")}
					/>
				</div>
			</nav>

			{/* Hero Section */}
			<section className="px-4 pb-16 pt-32">
				<div className="mx-auto max-w-4xl text-center">
					<h1 className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
						Get Honest Feedback from Founders Like You
					</h1>
					<p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
						Join a community where founders help founders grow. Give feedback,
						earn credits, and get expert insights on your next big idea.
					</p>
					<LandingButton
						content="Get Started"
						variant="primary"
						onClick={() => handleNavigation("/auth/login")}
					/>
				</div>

				{/* Video Section */}
				<div className="group mx-auto mt-16 flex aspect-video max-w-4xl cursor-pointer items-center justify-center rounded-lg bg-black/5 transition-colors hover:bg-black/10">
					<div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110">
						<Play className="text-primary ml-1 h-8 w-8" />
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="bg-secondary/50 py-24">
				<div className="mx-auto max-w-7xl px-4">
					<h2 className="mb-16 text-center text-4xl font-semibold antialiased">
						Our offerings
					</h2>

					<div className="grid gap-12 md:grid-cols-3">
						<div className="group space-y-4">
							<div className="aspect-square overflow-hidden rounded-lg">
								<Image
									src="/images/img1.png"
									alt="Real Reciprocity"
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									width={800}
									height={800}
									priority
								/>
							</div>
							<h3 className="text-xl font-semibold">Real Reciprocity</h3>
							<p className="text-muted-foreground">
								Give and get feedback—it&apos;s a balanced exchange
							</p>
						</div>

						<div className="group space-y-4">
							<div className="aspect-square overflow-hidden rounded-lg">
								<Image
									src="/images/img2.png"
									alt="No Noise, Just Value"
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									width={800}
									height={800}
								/>
							</div>
							<h3 className="text-xl font-semibold">No Noise, Just Value</h3>
							<p className="text-muted-foreground">
								Every piece of feedback counts, with no upvotes or fluff.
							</p>
						</div>

						<div className="group space-y-4">
							<div className="aspect-square overflow-hidden rounded-lg">
								<Image
									src="/images/img3.png"
									alt="Grow Together"
									className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									width={800}
									height={800}
								/>
							</div>
							<h3 className="text-xl font-semibold">Grow Together</h3>
							<p className="text-muted-foreground">
								A trusted community of startup leaders all working toward
								success.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-24">
				<div className="mx-auto max-w-3xl px-4 text-center">
					<h2 className="mb-6 text-3xl font-bold">Join Our Slack Community</h2>
					<p className="text-muted-foreground mb-8">
						We&apos;re in early development, working hard to build a platform
						where founders and ideators can exchange valuable feedback and
						refine their ideas with the help of like-minded entrepreneurs. Join
						our Slack community now to be part of the first wave and get
						priority access to post your ideas when we launch.
					</p>
					<LandingButton
						content="Join Us"
						variant="primary"
						onClick={() => console.log("Join")}
					/>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-[#1E1E1E] py-8">
				<div className="mx-auto max-w-7xl px-4 text-center text-white">
					<div className="mb-4 text-xl font-bold">ID8</div>
					<p className="text-muted-foreground text-sm">
						© 2024 ID8. All rights reserved.
					</p>
				</div>
			</footer>
		</main>
	);
}
