interface IInfiniteSelectProps {
	fetchOptions: (params: RequestApiInterface) => Promise<BaseOptionType[]>;
	debounceTimeout?: number;
	hasMore?: string;
	
	[key: string]: unknown;
}

interface BaseOptionType {
	disabled?: boolean;
	className?: string;
	title?: string;
	label: string,
	value: string | number | boolean;
}

type TModal = 'create' | 'read' | 'update' | 'delete' | 'other' | undefined