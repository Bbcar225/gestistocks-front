interface ProductInterface {
	id: number
	unit_id: number
	category_id: number
	name: string
	sku: string
	active: boolean
	created_at: string
	updated_at: string
	unit: UnitInterface
	category: CategoryInterface
	gallery: GalleryInterface
	unit_equivalences: UnitEquivalenceInterface[]
	stock: StockInterface,
	stocks: StockInterface[]
}

interface ProductFormDataInterface {
	unit_id: number
	category_id: number
	gallery_id: number
	name: string
	sku: string,
	active?: boolean
}

interface ProductQueryParamsInterface extends RequestApiInterface {
	search?: string,
	category_id?: number,
	salable?: 'yes' | 'no'
}