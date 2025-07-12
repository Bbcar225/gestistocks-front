interface AppStoreInterface {
	title?: string
}

interface HookApiInterface<QueryParams = RequestApiInterface, Response = undefined> {
	enabled?: boolean,
	id?: number|string,
	queryParams?: QueryParams,
	onSuccess?: (res: Response) => void
}

