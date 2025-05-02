import { CurrentDataType } from "./types";
import useFetch from "./useFetch";
import { getOrdinal } from "./util";

type CurrentDataProps = {
	query: string;
	format: string;
};

const currentDataTransform = (data: string): CurrentDataType => {
	const parsed = JSON.parse(data);
	return {
		location: parsed.location.name + ", " + parsed.location.country,
		time: parsed.location.localtime,
		current: {
			humidity: parsed.current.humidity,
			temp_c: parsed.current.temp_c,
			temp_f: parsed.current.temp_f,
			condition: parsed.current.condition,
			feelslike_c: parsed.current.feelslike_c,
			feelslike_f: parsed.current.feelslike_f,
			wind_kph: parsed.current.wind_kph,
		},
	};
};

const CurrentData = ({ query, format }: CurrentDataProps) => {
	const currentdata_url = query ? `${import.meta.env.VITE_BASE_URL}current.json?q=${query}&key=${import.meta.env.VITE_API_KEY}` : "";
	const { data, isLoading, error } = useFetch(currentdata_url, { enableDebouncing: false, enableThrottling: false }, currentDataTransform);

	if (!data || isLoading || error) {
		return null;
	}

	const dateObj = new Date(data.time);
	const time = dateObj.toLocaleTimeString([], {
		hour: "numeric",
		hour12: true,
	});
	const day = dateObj.getDate();
	const month = dateObj.toLocaleString("en-us", { month: "short" });
	const date = `${getOrdinal(day)} ${month}`;

	return (
		<div className="flex flex-col gap-4 my-4 p-6 rounded-[8px] w-fit bg-card transition-colors duration-300 ease-in">
			<div className="flex items-center gap-2 font-medium justify-evenly">
				<div className="flex flex-col items-center">
					<img src={data.current.condition.icon} className="w-16 h-16 object-cover" />
					<p className="text-xl">{data.location}</p>
				</div>
				<div className="flex flex-col items-center justify-center gap-2 text-lg">
					<span>{date}</span>
					<span>{time}</span>
				</div>
			</div>
			<div className="flex text-lg gap-4">
				<div className="flex flex-col justify-around gap-2">
					<p>
						<span className="font-medium">Temperature:</span>{" "}
						<span>{format === "C" ? data.current.temp_c + " \u2103" : data.current.temp_f + " \u2109"}</span>
					</p>
					<p>
						<span className="font-medium">Humidity:</span> {data.current.humidity}%
					</p>
				</div>
				<div className="flex flex-col justify-around gap-2">
					<p>
						<span className="font-medium">Feels like:</span>{" "}
						{format === "C" ? data.current.feelslike_c + " \u2103" : data.current.feelslike_f + " \u2109"}
					</p>
					<p>
						<span className="font-medium">Wind:</span> {data.current.wind_kph} km/h
					</p>
				</div>
			</div>
		</div>
	);
};

export default CurrentData;
