import { SetStateAction } from "react";

type FormatToggleProps = {
	format: string;
	setFormat: React.Dispatch<SetStateAction<string>>;
};

const FormatToggle = ({ format, setFormat }: FormatToggleProps) => {
	return (
		<div className="flex items-center rounded-full border-1 border-border shadow-md overflow-hidden">
			<button
				className={`px-2 py-1 h-full transition-all duration-300 ease-in font-medium ${format === "C" ? "bg-accent text-text-on-accent" : ""}`}
				onClick={() => setFormat("C")}>
				°C
			</button>
			<button
				className={`px-2 py-1 h-full transition-all duration-300 ease-in font-medium ${format === "F" ? "bg-accent text-text-on-accent" : ""}`}
				onClick={() => setFormat("F")}>
				°F
			</button>
		</div>
	);
};

export default FormatToggle;
