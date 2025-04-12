interface LoginFormDataInterface {
	email: string
	password: string
}

interface LoginResponseInterface {
	access_token: string
	token_type: string
	user: UserInterface
}