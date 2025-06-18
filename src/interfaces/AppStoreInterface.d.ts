interface AppStoreInterface {
	title?: string
}

interface HookApiInterface<QueryParams = RequestApiInterface> {
	enabled?: boolean,
	id?: number|string,
	queryParams?: QueryParams,
}

