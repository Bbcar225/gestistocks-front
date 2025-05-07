interface ContactInterface {
	id: number
	model_type: string
	model_id: number
	position_id: number
	name: string
	phoneNumber: string
	created_at: string
	updated_at: string
	position: PositionInterface
}

interface PositionInterface {
	id: number
	name: string
	created_at: string
	updated_at: string
}