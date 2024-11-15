import { useState, useEffect } from "react";

export default function useMobile() {
	const [width, setWidth] = useState<number>(window.innerWidth);
	function handleResize() {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const isMobile = width < 768;
	return isMobile;
}
