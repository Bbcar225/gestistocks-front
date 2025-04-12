interface UserInterface {
	id: number
	userable_type: UserableType
	userable_id: number
	name: string
	email: string
	created_at: string
	updated_at: string
	userable: TenantInterface
}
