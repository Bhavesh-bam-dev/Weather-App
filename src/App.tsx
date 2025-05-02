import ThemeToggle from "./ThemeToggle";
import SearchCity from "./SearchCity";
import { useState } from "react";
import FormatToggle from "./FormatToggle";
import FutureData from "./FutureData";
import CurrentData from "./CurrentData";
import LastSearch from "./LastSearch";

function App() {
	const [location, setLocation] = useState<string>("");
	const [format, setFormat] = useState<string>("C");

	return (
		<div className="w-9/10 lg:w-2/3 m-auto h-screen mt-4">
			<div className="flex justify-between items-center">
				<h1>Weather Dashboard</h1>
				<div className="flex gap-4 flex-col md:flex-row">
					<FormatToggle format={format} setFormat={setFormat} />
					<ThemeToggle />
				</div>
			</div>
			<SearchCity location={location} setLocation={setLocation} />
			<CurrentData query={location} format={format} />
			<FutureData query={location} format={format} />
			<LastSearch setLocation={setLocation} />
		</div>
	);
}

export default App;
