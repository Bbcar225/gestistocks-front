import service from "../../providers/AxiosProvider.ts";

const authTenantService = {
	login: (data: LoginFormDataInterface): Promise<ResponseApiInterface<LoginResponseInterface>> => {
		return service.post(`/tenant/auth/login`, data)
	}
}

export default authTenantService