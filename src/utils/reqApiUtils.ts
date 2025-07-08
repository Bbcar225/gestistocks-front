import dayjs from "dayjs";

type LabeledValue = {
	label: string;
	value: string | number;
	key?: string;
};

type QueryParam =
	| string
	| number
	| LabeledValue
	| [string, string]
	| [Date, Date]
	| undefined
	| null;

export function cleanQueryParams(params: QueryParamsFilter): Record<string, string | number | undefined> {
	const cleaned: Record<string, string | number | undefined> = {};
	
	for (const key in params) {
		const value = params[key];
		
		if (value === null || value === undefined) continue;
		
		if (isLabeledValue(value)) {
			cleaned[key] = value.value;
		} else if (Array.isArray(value)) {
			if (value.length === 2) {
				const [start, end] = value;
				
				if (dayjs(start).isValid()) {
					cleaned["start_date"] = dayjs(start).format("YYYY-MM-DD");
				}
				
				if (dayjs(end).isValid()) {
					cleaned["end_date"] = dayjs(end).format("YYYY-MM-DD");
				}
			}
		} else if (typeof value === "string") {
			cleaned[key] = value.trim() === "" ? undefined : value;
		} else {
			cleaned[key] = value;
		}
	}
	
	return cleaned;
}

function isLabeledValue(value: QueryParam): value is LabeledValue {
	return (
		typeof value === "object" &&
		value !== null &&
		"label" in value &&
		"value" in value &&
		(typeof value.value === "string" || typeof value.value === "number")
	);
}
