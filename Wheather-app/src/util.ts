const debounce = <T extends (...args: Parameters<T>) => void>(fun: T, delay: number) => {
	let timeoutId: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>) => {
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fun.apply(this, args), delay);
	};
};

const throttle = <T extends (...args: Parameters<T>) => void>(fun: T, limit: number) => {
	let lastRan = 0;
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	let lastArgs: Parameters<T> | null = null;

	return (...args: Parameters<T>) => {
		const now = Date.now();
		const remaining = limit - (now - lastRan);

		lastArgs = args;

		if (remaining <= 0) {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			fun.apply(this, args);
			lastRan = now;
		} else if (!timeoutId) {
			timeoutId = setTimeout(() => {
				lastRan = Date.now();
				timeoutId = null;
				if (lastArgs) {
					fun.apply(this, lastArgs);
					lastArgs = null;
				}
			}, remaining);
		}
	};
};

const getOrdinal = (n: number): string => {
	if (n > 3 && n < 21) return `${n}th`;
	switch (n % 10) {
		case 1:
			return `${n}st`;
		case 2:
			return `${n}nd`;
		case 3:
			return `${n}rd`;
		default:
			return `${n}th`;
	}
};

export { debounce, throttle, getOrdinal };
