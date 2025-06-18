import {useMutation, useQuery} from "react-query";
import authService from "../../../services/tenant/authService.ts";

export const queriesClientAuth = {
	useAuthAccount: 'useAuthAccount'
}

export const useAuthLogin = () => {
	return useMutation<ResponseApiInterface<LoginResponseInterface>, never, LoginFormDataInterface>(authService.login)
}

export const useAuthLogout = () => {
	return useMutation(authService.Logout)
}

export const useAuthAccount = (params?: HookApiInterface) => {
	return useQuery(
		[queriesClientAuth.useAuthAccount],
		() => authService.Account(),
		{
			enabled: params?.enabled
		}
	)
}

export const useAuthUpdateAccount = () => {
	return useMutation(authService.UpdateAccount)
}