import { FutureDataType } from "./types";

type WeeklyDataProps = {
	data: FutureDataType[];
	format: string;
};

const numToDay = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"];

const WeeklyData = ({ data, format }: WeeklyDataProps) => {
	return (
		<div className="flex flex-col bg-card rounded-[8px] p-4">
			<h3>Next Week Forecast</h3>
			<div className="w-full flex flex-col md:flex-row justify-between gap-3 mt-3">
				{data.map((item) => {
					const date = new Date(item.day.date);
					return (
						<div className="flex-1 flex flex-col items-center rounded-[8px] bg-accent text-text-on-accent p-4" key={item.day.date}>
							<span>{numToDay[date.getDay()]}</span>
							<img src={item.day.icon} className="" />
							<span>
								{format === "C" ? item.day.mintemp_c + " ℃" : item.day.mintemp_f + " ℉"} /{" "}
								{format === "C" ? item.day.maxtemp_c + " ℃" : item.day.maxtemp_f + " ℉"}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default WeeklyData;
