import {create} from "zustand";

interface GalleryStoreInterface {
	queryParams: RequestApiInterface & {
		search?: string,
		type?: TGalleryType
	},
	pagination: {
		total?: number
	},
	gallery?: GalleryInterface,
	
	setFieldQueryParams: ({field, value}: {
		field: keyof GalleryStoreInterface['queryParams'],
		value?: unknown
	}) => void,
	setFieldPagination: ({field, value}: {
		field: keyof GalleryStoreInterface['pagination'],
		value?: number
	}) => void,
	setGallery: (gallery?: GalleryInterface) => void,
}

const useGalleryStore = create<GalleryStoreInterface>((set) => {
	return {
		queryParams: {
			page: 1,
			per_page: 20
		},
		pagination: {
			total: 0
		},
		gallery: undefined,
		
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
		},
		setGallery: (gallery?: GalleryInterface) => {
			return set((state) => {
				return {
					...state,
					gallery: gallery
				}
			})
		}
	}
})

export default useGalleryStore