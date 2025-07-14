interface PaymentInterface {
	id: number
	tenant_id: number
	payer_type: string
	payer_id: number
	payable_type: string
	payable_id: number
	amount: number
	date: string
	created_at: string
	updated_at: string
	payer: CustomerInterface
	payable: SaleInterface
}

interface PaymentFormDataInterface {
  customer_id?: number|BaseOptionType
  amount?: number
  sale_id?: number|BaseOptionType
}

interface PaymentQueryParams extends RequestApiInterface {
	customer_id?: number,
	sale_id?: number
}