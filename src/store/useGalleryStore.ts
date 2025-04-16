import {create} from "zustand";

interface GalleryStoreInterface {
	queryParams: RequestApiInterface & {
		search?: string
	},
	pagination: {
		total?: number
	},
	
	setFieldQueryParams: ({field, value}: {
		field: keyof GalleryStoreInterface['queryParams'],
		value?: unknown
	}) => void,
	setFieldPagination: ({field, value}: {
		field: keyof GalleryStoreInterface['pagination'],
		value?: number
	}) => void,
}

const useGalleryStore = create<GalleryStoreInterface>((set) => {
	return {
		queryParams: {
			page: 1,
			per_page: 50
		},
		pagination: {
			total: 0
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
		setFieldQueryParams: ({field, value}) => {
			return set(state => {
				return {
					...state,
					queryParams: {
						...state.queryParams,
						[field]: value
					}
				}
			})
		}
	}
})

export default useGalleryStore