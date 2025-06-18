import {useQuery} from "react-query";
import formDataService from "../../../services/app/formDataService.ts";

export const formDataHookQueriesClients = {
	useFormDataGetCountries: 'useFormDataGetCountries',
	useFormDataGetPositions: 'useFormDataGetPositions',
	useFormDataGetTypesGallery: 'useFormDataGetTypesGallery'
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

export const useFormDataGetPositions = (params?: HookApiInterface) => {
	return useQuery(
		[formDataHookQueriesClients.useFormDataGetPositions],
		() => formDataService.GetPositions(),
		{
			enabled: params?.enabled
		}
	)
}

export const useFormDataGetTypesGallery = (params?: HookApiInterface) => {
	return useQuery(
		[formDataHookQueriesClients.useFormDataGetTypesGallery],
		() => formDataService.GetTypesGallery(),
		{
			enabled: params?.enabled
		}
	)
}