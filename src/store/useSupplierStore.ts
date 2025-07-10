import {create} from "zustand";

interface SupplierStoreInterface {
	queryParams: SupplierQueryParamsInterface,
	pagination: {
		total?: number
	},
	supplier?: SupplierInterface,
	
	setFieldQueryParams: ({field, value}: {
		field: keyof SupplierStoreInterface['queryParams'],
		value?: unknown
	}) => void,
	setFieldPagination: ({field, value}: {
		field: keyof SupplierStoreInterface['pagination'],
		value?: number
	}) => void,
	setSupplier: (supplier?: SupplierInterface) => void,
	resetQueryParams: () => void,
	updateContactOfSupplier: (contact: ContactInterface) => void,
	setQueryParams: (queryParams: SupplierQueryParamsInterface) => void,
}

const queryParams = {
	page: 1,
	per_page: 20
}

const pagination = {
	total: 0
}

export const useSupplierStore = create<SupplierStoreInterface>((set) => {
	return {
		queryParams,
		pagination,
		supplier: undefined,
		
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
		setSupplier: (supplier?: SupplierInterface) => {
			return set((state) => {
				return {
					...state,
					supplier
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
		updateContactOfSupplier: (contact) => {
			return set((state) => {
				const supplier = state?.supplier
				
				if (supplier) {
					const contacts = [...supplier.contacts || []]
					
					const indexContact = contacts.findIndex(ct => ct.id === contact.id)
					
					if (indexContact > -1) {
						contacts[indexContact] = contact
					}
					
					supplier.contacts = contacts
				}
				
				return {
					...state,
					supplier
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