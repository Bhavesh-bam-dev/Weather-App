import { SetStateAction } from "react";

interface Props {
	setLocation: React.Dispatch<SetStateAction<string>>;
}

const LastSearch = ({ setLocation }: Props) => {
	const history = localStorage.getItem("history");
	const items: string[] = history ? JSON.parse(history).reverse() : [];

	console.log("Render LastSearch");

	const onHistoryClick = (item: string) => {
		setLocation(item);
	};

	if (items.length <= 0) return;

	return (
		<div className="pb-4">
			<div className="mt-4 p-4 bg-card rounded-lg mb-4">
				<h3 className="pb-2">Previous Searches</h3>
				<ul>
					{items.map((item, index) => (
						<li className="p-1" key={index}>
							<a onClick={() => onHistoryClick(item)} className=" cursor-pointer text-lg text-text-secondary hover:text-text">
								{item}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default LastSearch;
