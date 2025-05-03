import {create} from "zustand";

interface UnitStoreInterface {
	queryParams: RequestApiInterface & {
		search?: string
	},
	pagination: {
		total?: number
	},
	unit?: UnitInterface,
	
	setFieldQueryParams: ({field, value}: {
		field: keyof UnitStoreInterface['queryParams'],
		value?: unknown
	}) => void,
	setFieldPagination: ({field, value}: {
		field: keyof UnitStoreInterface['pagination'],
		value?: number
	}) => void,
	setUnit: (unit?: UnitInterface) => void,
	resetQueryParams: () => void
}

const queryParams = {
	page: 1,
	per_page: 20
}

const pagination = {
	total: 20
}

export const useUnitStore = create<UnitStoreInterface>((set) => {
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
		setUnit: (unit) => {
			return set((state) => {
				return {
					...state,
					unit
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