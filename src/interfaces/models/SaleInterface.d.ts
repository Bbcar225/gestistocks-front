interface SaleInterface {
	id: number
	customer_id: number
	contact_id: number
	reference: string
	total_price: number
	items_count: number
	date: string
	payment_sum: number
	created_at: string
	updated_at: string
	customer: CustomerInterface
	contact: ContactInterface
	items: SaleItemInterface[]
}

interface SaleItemInterface {
	id: number
	sale_id: number
	stock_id: number
	quantity: number
	origin_price: number
	unit_price: number
	total_price: number
	created_at: string
	updated_at: string
	product: ProductInterface
	stock: StockInterface,
	unit: UnitInterface
}

interface SaleFormData {
	customer_id: number
	contact_id: number
	date: string
	items: SaleItemFormData[]
}

interface SaleItemFormData {
	product_id: number
	quantity: number
	unit_price: number,
	id?: number,
	destroy?: boolean
}

interface SaleQueryParamsInterface extends RequestApiInterface {
	customer_id?: number,
	customer?: BaseOptionType
	start_date?: string,
	end_date?: string,
}
