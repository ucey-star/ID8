import React from "react";
import { Button } from "@mui/material";
import Image from "next/image";

const GoogleButton: React.FC<{ content: string }> = ({ content }) => {
	return (
		<>
			<Button
				variant="outlined"
				sx={{
					mb: 3,
					fontFamily: "Outfit",
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					borderRadius: "6px",
					borderColor: "grey.300",
					backgroundColor: "white",
					px: 2,
					py: 1,
					textTransform: "none",
					fontWeight: 600,
					color: "grey.800",
					transition: "background-color 300ms",
					"&:hover": {
						backgroundColor: "grey.100",
					},
				}}
			>
				<Image
					src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
					alt="Google logo"
					height={20}
					width={20}
					style={{ marginRight: "8px" }}
				/>
				{content}
			</Button>
		</>
	);
};

export default GoogleButton;
