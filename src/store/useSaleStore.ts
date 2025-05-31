import {create} from "zustand";
import dayjs from "dayjs";
import {SaleInterface} from "../interfaces/models/SaleInterface";

interface SaleStoreInterface {
	queryParams: RequestApiInterface & {
		search?: string
	},
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
		}
	}
})

export default useSaleStore