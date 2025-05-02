import React, { SetStateAction, useState } from "react";
import useFetch from "./useFetch";

type SearchCityProps = {
	location: string;
	setLocation: React.Dispatch<SetStateAction<string>>;
};

interface SuggestionResponse {
	id: string;
	name: string;
	region: string;
	country: string;
}

const transformData = (data: string): SuggestionResponse[] => {
	if (!data) return [];
	const parsedData = JSON.parse(data);
	return parsedData.map((item: SuggestionResponse) => ({ id: item.id, name: item.name, region: item.region, country: item.country }));
};

const SearchCity = (props: SearchCityProps) => {
	const [query, setQuery] = useState<string>("");
	const searchUrl = query.trim() ? `${import.meta.env.VITE_BASE_URL}search.json?q=${query}&key=${import.meta.env.VITE_API_KEY}` : "";
	const { data, isLoading, error } = useFetch<SuggestionResponse[]>(
		searchUrl,
		{
			enableDebouncing: false,
			debouncingDelay: 1000,
		},
		transformData
	);

	const queryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setQuery(value);
	};

	const onSuggestionClickHandler = (event: React.MouseEvent<HTMLUListElement>) => {
		const target = event.target as HTMLElement;
		if (target.tagName === "LI") {
			const itemId = target.id;
			const selectedItem = data?.find((item) => item.id == itemId);
			if (selectedItem && selectedItem.name) {
				props.setLocation(selectedItem.name);
				const searchHistory = localStorage.getItem("history");
				if (searchHistory) {
					const searchHistoryArray: string[] = JSON.parse(searchHistory);
					if (!searchHistoryArray.includes(selectedItem.name)) {
						searchHistoryArray?.push(selectedItem.name);
					}
					const newSearchHistoryArray = searchHistoryArray.slice(-5);
					localStorage.setItem("history", JSON.stringify(newSearchHistoryArray));
				} else {
					localStorage.setItem("history", JSON.stringify([selectedItem.name]));
				}
			}
		}
		setQuery("");
	};

	let suggestionList;
	const shouldShowSuggestions = !error && !isLoading && data && data.length > 0;
	if (shouldShowSuggestions) {
		suggestionList = (
			<ul
				role="list"
				className="absolute top-full left-0 w-full z-10 bg-card border-border border-2 border-t-0 rounded-b-[8px] cursor-pointer"
				onClick={onSuggestionClickHandler}>
				{data.map((item: SuggestionResponse) => (
					<li key={item.id} id={item.id} className="p-2">
						{item.name}
						{item.region ? `, ${item.region}, ` : ", "}
						{item.country}
					</li>
				))}
			</ul>
		);
	}

	return (
		<div className="shadow-2xl relative w-full">
			<input
				className={`w-full bg-card border-border border-2 rounded-[8px] h-10 mt-4 p-2 focus:outline-none ${
					shouldShowSuggestions ? " rounded-b-none" : ""
				}`}
				type="text"
				onChange={queryChangeHandler}
				value={query}></input>
			{!isLoading && !error && suggestionList}
		</div>
	);
};

export default SearchCity;
