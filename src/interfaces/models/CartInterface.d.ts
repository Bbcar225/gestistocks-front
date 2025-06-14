interface CartInterface {
	date?: Date
	customer?: BaseOptionType,
	contact?: BaseOptionType,
	items?: CartItemInterface[]
}

interface CartItemInterface {
	product: ProductInterface,
	quantity: number,
	unit_price: number,
	id?: number,
	destroy?: boolean
}