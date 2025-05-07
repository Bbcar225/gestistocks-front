import {useQuery} from "react-query";
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