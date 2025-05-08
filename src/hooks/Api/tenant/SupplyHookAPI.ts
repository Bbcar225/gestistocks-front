import {useMutation, useQuery} from "react-query";
import supplyService from "../../../services/tenant/supplyService.ts";

export const supplyQueriesClients = {
	useSupplyGetAll: 'useSupplyGetAll'
}

export const useSupplyGetAll = (params?: HookApiInterface) => {
	return useQuery(
		[supplyQueriesClients.useSupplyGetAll, params?.queryParams],
		() => supplyService.GetAll(params?.queryParams),
		{
			enabled: params?.enabled
		}
	)
}

export const useSupplyCreate = () => {
	return useMutation(supplyService.Create)
}

export const useSupplyUpdate = (id: number) => {
	return useMutation<ResponseApiInterface<SupplyInterface>, never, SupplyFormData>((formData) => supplyService.Update(id, formData))
}