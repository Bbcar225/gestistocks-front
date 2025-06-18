import service from "../../providers/AxiosProvider.ts";

const authTenantService = {
	login: (data: LoginFormDataInterface): Promise<ResponseApiInterface<LoginResponseInterface>> => {
		return service.post(`/tenant/auth/login`, data)
	},
	Logout: (): Promise<ResponseApiInterface<never>> => {
		return service.post(`/tenant/auth/account/logout`)
	},
	Account: (): Promise<ResponseApiInterface<TenantInterface>> => {
		return service.get(`/tenant/auth/account`)
	},
	UpdateAccount: (data: AccountFormDataInterface): Promise<ResponseApiInterface<TenantInterface>> => {
		return service.put(`/tenant/auth/account`, data)
	}
}

export default authTenantService