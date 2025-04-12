import {useMutation} from "react-query";
import authService from "../../../services/tenant/authService.ts";

export const useAuthTenantService = () => {
	return useMutation<ResponseApiInterface<LoginResponseInterface>, never, LoginFormDataInterface>(authService.login)
}