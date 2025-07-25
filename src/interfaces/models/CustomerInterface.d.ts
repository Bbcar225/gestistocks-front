interface CustomerInterface {
  id: number
  name: string
  country: string
  city: string
  address: string
	sale_sum: number
	payment_sum: number
  created_at: string
  updated_at: string
  contacts: ContactInterface[]
}

interface CustomerFormData {
	name?: string
	country?: string | string[]
	city?: string | string[]
	address?: string
}

interface CustomerQueryParamsInterface extends RequestApiInterface {
	country?: string,
}