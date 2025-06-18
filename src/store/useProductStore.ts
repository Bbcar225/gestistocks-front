import {create} from "zustand";

interface ProductStoreInterface {
	queryParams: ProductQueryParamsInterface,
	pagination: {
		total?: number
	},
	product?: ProductInterface,
	
	setFieldQueryParams: ({field, value}: {
		field: keyof ProductStoreInterface['queryParams'],
		value?: unknown
	}) => void,
	setFieldPagination: ({field, value}: {
		field: keyof ProductStoreInterface['pagination'],
		value?: number
	}) => void,
	setProduct: (product?: ProductInterface) => void,
	resetQueryParams: () => void
}

const queryParams = {
	page: 1,
	per_page: 20
}

const pagination = {
	total: 0
}

export const useProductStore = create<ProductStoreInterface>((set) => {
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
		setProduct: (product) => {
			return set((state) => {
				return {
					...state,
					product
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