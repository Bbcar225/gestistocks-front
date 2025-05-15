interface StockInterface {
	id: number
	product_id: number
	active: boolean
	price: number
	quantity: number
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