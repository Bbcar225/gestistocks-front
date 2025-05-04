import {create} from "zustand";

interface WarehouseStoreInterface {
	queryParams: RequestApiInterface & {
		search?: string
	},
	pagination: {
		total?: number
	},
	warehouse?: WarehouseInterface,
	
	setFieldQueryParams: ({field, value}: {
		field: keyof WarehouseStoreInterface['queryParams'],
		value?: unknown
	}) => void,
	setFieldPagination: ({field, value}: {
		field: keyof WarehouseStoreInterface['pagination'],
		value?: number
	}) => void,
	setWarehouse: (warehouse?: WarehouseInterface) => void,
	resetQueryParams: () => void
}

const queryParams = {
	page: 1,
	per_page: 20
}

const pagination = {
	total: 0
}

export const useWarehouseStore = create<WarehouseStoreInterface>((set) => {
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
		setWarehouse: (warehouse?: WarehouseInterface) => {
			return set((state) => {
				return {
					...state,
					warehouse
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