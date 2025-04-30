import OneDayData from "./OneDayData";
import { FutureDataType, WeekRawDataType } from "./types";
import useFetch from "./useFetch";
import WeeklyData from "./WeeklyData";

type Props = {
	format: string;
	query: string;
};

const weeklyDataTransform = (data: string): FutureDataType[] => {
	const parsed = JSON.parse(data);
	const eData = parsed.forecast.forecastday;
	return eData.map((item: WeekRawDataType, index: number) => ({
		day: {
			maxtemp_c: item.day.maxtemp_c,
			maxtemp_f: item.day.maxtemp_f,
			mintemp_c: item.day.mintemp_c,
			mintemp_f: item.day.mintemp_f,
			date: item.date,
			icon: item.day.condition.icon,
		},
		day_hours:
			index === 0
				? item.hour.map((hourItem) => ({
						time: hourItem.time,
						temp_c: hourItem.temp_c,
						temp_f: hourItem.temp_f,
						condition: { ...hourItem.condition },
				  }))
				: {},
	}));
};

export default function FutureData({ format, query }: Props) {
	const weeklydata_url = query ? `${import.meta.env.VITE_BASE_URL}forecast.json?q=${query}&key=${import.meta.env.VITE_API_KEY}&days=7` : "";
	const { data, isLoading, error } = useFetch(weeklydata_url, { enableDebouncing: false, enableThrottling: false }, weeklyDataTransform);

	if (!data || error || isLoading) {
		return null;
	}
	return (
		<>
			<OneDayData data={data[0].day_hours} format={format} />
			<WeeklyData data={data} format={format} />
		</>
	);
}
