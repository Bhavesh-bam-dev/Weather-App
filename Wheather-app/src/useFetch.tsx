import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce, throttle } from "./util";

interface FetchOptions {
	enableDebouncing?: boolean;
	enableThrottling?: boolean;
	debouncingDelay?: number; // Default: 300ms
	throttlingLimit?: number; // Default: 300ms
}

const useFetch = <T,>(url: string, options: FetchOptions, transformData?: (data: string) => T) => {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const fetchData = useCallback(
		async (url: string) => {
			setIsLoading(true);
			setError("");
			try {
				const response = await axios.get(url, {
					transformResponse: transformData ? [transformData] : [],
				});
				setData(response.data);
			} catch (error) {
				setError("Error occurred!");
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		},
		[transformData]
	);

	const fetchToUse = useMemo(() => {
		if (options.enableThrottling) {
			return throttle(fetchData, options.throttlingLimit ?? 300);
		} else if (options.enableDebouncing) {
			return debounce(fetchData, options.debouncingDelay ?? 300);
		} else {
			return fetchData;
		}
	}, [fetchData, options.throttlingLimit, options.debouncingDelay, options.enableDebouncing, options.enableThrottling]);

	useEffect(() => {
		if (!url) {
			setData(null);
			setIsLoading(false);
			setError("");
			return;
		}
		fetchToUse(url);
	}, [fetchToUse, url]);

	return { data, isLoading, error } as const;
};

export default useFetch;
