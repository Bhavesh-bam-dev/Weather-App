export interface WeekDataType {
	maxtemp_c: number;
	maxtemp_f: number;
	mintemp_c: number;
	mintemp_f: number;
	icon: string;
	date: string;
}

export interface DayHourDataType {
	time: string;
	temp_c: number;
	temp_f: number;
	condition: {
		icon: string;
		text: string;
		code: number;
	};
}

export interface WeekRawDataType {
	day: {
		maxtemp_c: number;
		maxtemp_f: number;
		mintemp_c: number;
		mintemp_f: number;
		condition: {
			icon: string;
		};
	};
	hour: DayHourDataType[];
	date: string;
}

export interface FutureDataType {
	day_hours: DayHourDataType[];
	day: WeekDataType;
}

export interface CurrentDataType {
	location: string;
	time: string;
	current: {
		temp_c: number;
		temp_f: number;
		humidity: number;
		condition: {
			text: string;
			icon: string;
		};
		wind_kph: number;
		feelslike_c: number;
		feelslike_f: number;
	};
}
