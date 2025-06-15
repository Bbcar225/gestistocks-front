interface PurchaseInterface {
	id: number
	supplier_id: number
	reference: string
	date: string
	total_price: number
	created_at: string
	updated_at: string
	supplier: SupplierInterface
	contact: ContactInterface
	items: PurchaseItem[]
	items_count?: number
}

interface PurchaseFormDataInterface {
	supplier_id: number
	reference?: string
	items: PurchaseItemFormDataInterface[]
	date: string,
	contact_id: number
}

type PurchaseUpdateFormDataInterface = Pick<PurchaseFormDataInterface, 'supplier_id' | 'date' | 'reference' | 'contact_id'>;

interface PurchaseItemFormDataInterface {
	product_id: number
	unit_id: number
	quantity: number
	unit_price: number
	id?: number
}

interface PurchaseItemWriteFormData {
	items: PurchaseItemFormDataInterface[]
}

interface PurchaseItemRemoveFormData {
	items: number[]
}

interface PurchaseCartInterface {
	supplier?: BaseOptionType,
	contact?: BaseOptionType,
	reference?: string,
	items?: PurchaseItemCartItemInterface[],
	date?: string,
}

interface PurchaseItemCartItemInterface {
	product?: BaseOptionType,
	unit?: BaseOptionType,
	quantity?: number,
	unit_price?: number,
	deleted?: boolean,
	id?: number
}