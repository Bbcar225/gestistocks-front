import {create} from "zustand";

interface CustomerStoreInterface {
	queryParams: CustomerQueryParamsInterface,
	pagination: {
		total?: number
	},
	customer?: CustomerInterface,
	
	setFieldQueryParams: ({field, value}: {
		field: keyof CustomerStoreInterface['queryParams'],
		value?: unknown
	}) => void,
	setFieldPagination: ({field, value}: {
		field: keyof CustomerStoreInterface['pagination'],
		value?: number
	}) => void,
	setCustomer: (customer?: CustomerInterface) => void,
	resetQueryParams: () => void,
	updateContactOfCustomer: (contact: ContactInterface) => void,
	setQueryParams: (queryParams: CustomerQueryParamsInterface) => void,
}

const queryParams = {
	page: 1,
	per_page: 20
}

const pagination = {
	total: 0
}

export const useCustomerStore = create<CustomerStoreInterface>((set) => {
	return {
		queryParams,
		pagination,
		customer: undefined,
		
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
		setCustomer: (customer?: CustomerInterface) => {
			return set((state) => {
				return {
					...state,
					customer
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
		updateContactOfCustomer: (contact) => {
			return set((state) => {
				const customer = state?.customer
				
				if (customer) {
					const contacts = [...customer.contacts || []]
					
					const indexContact = contacts.findIndex(ct => ct.id === contact.id)
					
					if (indexContact > -1) {
						contacts[indexContact] = contact
					}
					
					customer.contacts = contacts
				}
				
				return {
					...state,
					customer
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
		},
	}
})