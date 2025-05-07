interface SupplyInterface {
	id: number
	name: string
	country: string
	city: string
	address: string
	created_at: string
	updated_at: string
	contacts: ContactInterface[]
}

interface SupplyFormData {
	name: string
	country: string
	city: string
	address: string
}