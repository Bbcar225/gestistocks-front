interface StockInterface {
	id: number
	active: boolean
	price: number
	quantity: number
	created_at: string
	updated_at: string
}

interface StockFormDataInterface {
	warehouse_id: number
	price: number
	active: boolean
	quantity: number
}