import { debounce, throttle, getOrdinal } from "./util";

describe("Utils - Throttle", () => {
    it("should execute the function once per time limit", () => {
        jest.useFakeTimers();
        const originalFn = jest.fn();
        const throttledFn = throttle(originalFn, 500);
        throttledFn();
        expect(originalFn).toHaveBeenCalled();
        jest.advanceTimersByTime(300);
        throttledFn();
        expect(originalFn).toHaveBeenCalledTimes(1);
        jest.advanceTimersByTime(200);
        expect(originalFn).toHaveBeenCalledTimes(2);
        jest.useRealTimers();
    })
});

describe("Utils - Debounce", () => {
    it("should execute the function after given delay", () => {
        jest.useFakeTimers();
        const originalFn = jest.fn();
        const debounced = debounce(originalFn, 500);
        debounced();
        expect(originalFn).not.toHaveBeenCalled();
        jest.advanceTimersByTime(500);
        expect(originalFn).toHaveBeenCalled();
        jest.useRealTimers();
    })
    it("should not execute the function before the delay and reset the delay if called before the delay", () => {
        jest.useFakeTimers();
        const originalFn = jest.fn();
        const debounced = debounce(originalFn, 500);
        debounced();
        expect(originalFn).not.toHaveBeenCalled();
        jest.advanceTimersByTime(300);
        debounced();
        expect(originalFn).not.toHaveBeenCalled();
        jest.advanceTimersByTime(300);
        expect(originalFn).not.toHaveBeenCalled();
        jest.advanceTimersByTime(200);
        expect(originalFn).toHaveBeenCalled();
        jest.useRealTimers();
    })
});

describe("Utils - GetOrdinal", () => {
    it("should return the correct ordinal suffix for numbers", () => {
        expect(getOrdinal(1)).toBe("1st");
        expect(getOrdinal(2)).toBe("2nd");
        expect(getOrdinal(3)).toBe("3rd");
        expect(getOrdinal(4)).toBe("4th");
        expect(getOrdinal(11)).toBe("11th");
        expect(getOrdinal(21)).toBe("21st");
        expect(getOrdinal(22)).toBe("22nd");
        expect(getOrdinal(23)).toBe("23rd");
        expect(getOrdinal(101)).toBe("101st");
    });
});