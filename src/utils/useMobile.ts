import useMediaQuery from "@mui/material/useMediaQuery";

export default function useMobile() {
	return useMediaQuery("(max-width: 768px)");
}
