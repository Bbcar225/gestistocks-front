import {create} from "zustand";
import dayjs from "dayjs";

interface SaleStoreInterface {
	queryParams: SaleQueryParamsInterface,
	pagination: {
		total?: number
	},
	sale?: SaleInterface,
	
	setFieldQueryParams: ({field, value}: {
		field: keyof SaleStoreInterface['queryParams'],
		value?: unknown
	}) => void,
	setFieldPagination: ({field, value}: {
		field: keyof SaleStoreInterface['pagination'],
		value?: number
	}) => void,
	setSale: (sale?: SaleInterface) => void,
	resetQueryParams: () => void,
	setQueryParams: (queryParams: SaleQueryParamsInterface) => void
}

const queryParams = {
	page: 1,
	per_page: 20
}

const pagination = {
	total: 20
}

const useSaleStore = create<SaleStoreInterface>((set) => {
	return {
		queryParams,
		pagination,
		cart: {
			date: dayjs().format('YYYY-MM-DD'),
		},
		
		setFieldQueryParams: ({field, value}) => {
			return set((state) => {
				return {
					...state,
					queryParams: {
						...state.queryParams,
						[field]: value,
					}
				}
			})
		},
		setFieldPagination: ({field, value}) => {
			return set((state) => {
				return {
					...state,
					pagination: {
						...state.pagination,
						[field]: value,
					}
				}
			})
		},
		setSale: (sale) => {
			return set((state) => {
				return {
					...state,
					sale
				}
			})
		},
		resetQueryParams: () => {
			return set((state) => {
				return {
					...state,
					queryParams
				}
			})
		},
		setQueryParams: (queryParams) => {
			return set((state) => {
				return {
					...state,
					queryParams: {
						...state.queryParams, ...queryParams
					}
				}
			})
		}
	}
})

export default useSaleStore