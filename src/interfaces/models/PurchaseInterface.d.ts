interface PurchaseInterface {
	id: number
	supplier_id: number
	reference: string
	date: string
	total_price: number
	created_at: string
	updated_at: string
	supplier: SupplierInterface
	items: PurchaseItem[]
	items_count?: number
}
