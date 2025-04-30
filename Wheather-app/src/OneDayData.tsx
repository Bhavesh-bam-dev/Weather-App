import { DayHourDataType } from "./types";

type OneDayDataProps = {
	data: DayHourDataType[];
	format: string;
};

const OneDayData = ({ data, format }: OneDayDataProps) => {
	return (
		<div className="flex flex-col rounded-[8px] bg-card p-4 mb-4">
			<h3>Today Hourly Forecast</h3>
			<div className="grid grid-cols-6 gap-4 mt-3 text-text-on-accent">
				{data.map((item) => {
					const time = new Date(item.time).toLocaleTimeString([], {
						hour: "numeric",
						hour12: true,
					});
					return (
						<div className="flex flex-col bg-accent items-center justify-center rounded-[8px] p-4">
							<p>{time}</p>
							<img src={item.condition.icon} className="h-16 w-16" />
							<p>{format === "C" ? item.temp_c + " ℃" : item.temp_f + " ℉"}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OneDayData;
