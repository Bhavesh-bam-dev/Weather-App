import { DayHourDataType } from "./types";

type OneDayDataProps = {
	data: DayHourDataType[];
	format: string;
};

const OneDayData = ({ data, format }: OneDayDataProps) => {
	return (
		<div className="flex flex-col rounded-[8px] bg-card p-4 mb-4">
			<h3>Today Hourly Forecast</h3>
			<div className="flex overflow-x-auto gap-4 mt-3 text-text-on-accent">
				{data.map((item) => {
					const time = new Date(item.time).toLocaleTimeString([], {
						hour: "numeric",
						hour12: true,
					});
					return (
						<div key={item.time} className="flex flex-col bg-accent items-center justify-center rounded-lg p-4">
							<p className=" whitespace-nowrap">{time}</p>
							<img src={item.condition.icon} className="aspect-square w-[64px] max-w-none" />
							<p className=" whitespace-nowrap">{format === "C" ? item.temp_c + " ℃" : item.temp_f + " ℉"}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OneDayData;
