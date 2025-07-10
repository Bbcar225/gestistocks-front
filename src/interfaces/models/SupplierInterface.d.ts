interface SupplierInterface {
	id: number
	name: string
	country: string
	city: string
	address: string
	created_at: string
	updated_at: string
	contacts: ContactInterface[]
}

interface SupplierFormData {
	name: string
	country: string
	city: string
	address: string
}

interface SupplierQueryParamsInterface extends RequestApiInterface {

}