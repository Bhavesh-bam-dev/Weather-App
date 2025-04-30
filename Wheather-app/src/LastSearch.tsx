import { SetStateAction, useEffect, useState } from "react";

interface Props {
	setLocation: React.Dispatch<SetStateAction<string>>;
}

const LastSearch = ({ setLocation }: Props) => {
	const [items, setItems] = useState<string[]>([]);

	useEffect(() => {
		const searchHistory = localStorage.getItem("history");
		if (!searchHistory) {
			setItems([]);
			return;
		}
		const searchHistoryList = JSON.parse(searchHistory);
		setItems(searchHistoryList);
	}, []);

	const onHistoryClick = (item: string) => {
		setLocation(item);
	};

	console.log("As", items);
	if (items.length <= 0) return;

	return (
		<ul>
			{items.map((item) => (
				<li>
					<a onClick={() => onHistoryClick(item)}>{item}</a>
				</li>
			))}
		</ul>
	);
};

export default LastSearch;
