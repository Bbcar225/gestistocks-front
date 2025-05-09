interface ContactInterface {
	id: number
	model_type: string
	model_id: number
	position_id: number
	name: string
	phoneNumber: string
	is_whatsapp: boolean
	position: PositionInterface
	created_at: string
	updated_at: string
}

interface PositionInterface {
	id: number
	name: string
	created_at: string
	updated_at: string
}

interface ContactFormData {
	position_id: number
	name: string
	phoneNumber: string
	is_whatsapp: boolean,
	position?: BaseOptionType
}