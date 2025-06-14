interface StockInterface {
	id: number
	product_id: number
	active: boolean
	price: number
	quantity: number,
	low_quantity_threshold: number,
	low_quantity: boolean
	created_at: string
	updated_at: string,
	warehouse: WarehouseInterface
}

interface StockFormDataInterface {
	warehouse_id: number
	price: number
	active: boolean
	quantity: number,
	product?: BaseOptionType,
	purchase_price?: number
}