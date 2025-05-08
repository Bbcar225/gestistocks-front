import {useQuery} from "react-query";
import formDataService from "../../../services/app/formDataService.ts";

export const formDataHookQueriesClients = {
	useFormDataGetCountries: 'useFormDataGetCountries'
}

export const useFormDataGetCountries = (params?: HookApiInterface) => {
	return useQuery(
		[formDataHookQueriesClients.useFormDataGetCountries],
		() => formDataService.GetCountries(),
		{
			enabled: params?.enabled
		}
	)
}