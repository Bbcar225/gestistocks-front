import {create} from "zustand";

interface CategoryStoreInterface {
	queryParams: RequestApiInterface & {
		search?: string
	},
	pagination: {
		total?: number
	},
	category?: CategoryInterface,
	
	setFieldQueryParams: ({field, value}: {
		field: keyof CategoryStoreInterface['queryParams'],
		value?: unknown
	}) => void,
	setFieldPagination: ({field, value}: {
		field: keyof CategoryStoreInterface['pagination'],
		value?: number
	}) => void,
	setCategory: (category?: CategoryInterface) => void,
	resetQueryParams: () => void
}

const queryParams = {
	page: 1,
	per_page: 20
}

const pagination = {
	total: 20
}

export const useCategoryStore = create<CategoryStoreInterface>((set) => {
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
		setCategory: (category) => {
			return set((state) => {
				return {
					...state,
					category
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