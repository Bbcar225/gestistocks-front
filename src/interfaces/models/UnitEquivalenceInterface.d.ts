interface UnitEquivalenceInterface {
	id: number
	tenant_id: number
	model_type: ModelType
	model_id: number
	unit_id: number
	value: number
	created_at: string
	updated_at: string,
	unit: UnitInterface
}

interface UnitEquivalenceFormDataInterface {
	unit_id: number
	value: number
}