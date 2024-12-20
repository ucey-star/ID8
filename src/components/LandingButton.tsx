interface LandingButtonProps {
	content: string;
	variant?: "primary" | "secondary";
	onClick?: () => void;
}

export default function LandingButton({
	content,
	variant = "primary",
	onClick,
}: LandingButtonProps) {
	const baseStyles =
		"px-6 py-3 rounded-lg font-medium transition-all duration-300 text-sm";
	const variantStyles =
		variant === "primary"
			? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:-translate-y-0.5"
			: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 hover:border-gray-300 hover:shadow";

	return (
		<button className={`${baseStyles} ${variantStyles}`} onClick={onClick}>
			{content}
		</button>
	);
}
