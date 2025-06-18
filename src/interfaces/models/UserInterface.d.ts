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

interface LoginFormDataInterface {
	email: string
	password: string
}

interface LoginResponseInterface {
	access_token: string
	token_type: string
	user: UserInterface
}

interface AccountFormDataInterface {
	gallery_id: number
	name: string
	email: string
	phoneNumber: string
	address: string
	notice_invoice: string
}