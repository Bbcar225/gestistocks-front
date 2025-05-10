import {create} from "zustand";
import dayjs from "dayjs";

interface PurchaseStoreInterface {
	queryParams: RequestApiInterface & {
		search?: string
	},
	pagination: {
		total?: number
	},
	purchase?: PurchaseInterface,
	cart?: PurchaseCartInterface,
	
	setFieldQueryParams: ({field, value}: {
		field: keyof PurchaseStoreInterface['queryParams'],
		value?: unknown
	}) => void,
	setFieldPagination: ({field, value}: {
		field: keyof PurchaseStoreInterface['pagination'],
		value?: number
	}) => void,
	setPurchase: (purchase?: PurchaseInterface) => void,
	resetQueryParams: () => void,
	setFieldCart: ({field, value}: {
		field: keyof PurchaseCartInterface,
		value?: unknown
	}) => void
}

const queryParams = {
	page: 1,
	per_page: 20
}

const pagination = {
	total: 20
}

export const usePurchaseStore = create<PurchaseStoreInterface>((set) => {
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
		setPurchase: (purchase) => {
			return set((state) => {
				return {
					...state,
					purchase
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
		setFieldCart: ({field, value}) => {
			return set((state) => {
				return {
					...state,
					cart: {
						...state.cart,
						[field]: value
					}
				}
			})
		},
	}
})