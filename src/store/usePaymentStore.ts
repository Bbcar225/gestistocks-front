import {create} from "zustand";

interface PaymentStoreInterface {
	queryParams: RequestApiInterface & {
		search?: string
	},
	pagination: {
		total?: number
	},
	payment?: PaymentInterface,
	
	setFieldQueryParams: ({field, value}: {
		field: keyof PaymentStoreInterface['queryParams'],
		value?: unknown
	}) => void,
	setFieldPagination: ({field, value}: {
		field: keyof PaymentStoreInterface['pagination'],
		value?: number
	}) => void,
	setPayment: (payment?: PaymentInterface) => void,
	resetQueryParams: () => void
}

const queryParams = {
	page: 1,
	per_page: 20
}

const pagination = {
	total: 20
}

export const usePaymentStore = create<PaymentStoreInterface>((set) => {
	return {
		queryParams,
		pagination,
		
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
		setPayment: (payment) => {
			return set((state) => {
				return {
					...state,
					payment
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