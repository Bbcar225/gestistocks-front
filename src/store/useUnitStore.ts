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
}

export const useUnitStore = create<UnitStoreInterface>((set) => {
	return {
		queryParams: {
			page: 1,
			per_page: 20
		},
		pagination: {
			total: 20
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
		setUnit: (unit) => {
			return set((state) => {
				return {
					...state,
					unit
				}
			})
		}
	}
})