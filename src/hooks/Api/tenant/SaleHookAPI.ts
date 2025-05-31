import {useMutation, useQuery} from "react-query";
import saleService from "../../../services/tenant/saleService.ts";

export const saleQueriesClients = {
	useSaleGetAll: 'useSaleGetAll'
}

export const useSaleCreate = () => {
	return useMutation(saleService.Create)
}

export const useSaleGetAll = (params?: HookApiInterface) => {
	return useQuery(
		[saleQueriesClients.useSaleGetAll, params?.queryParams],
		() => saleService.GetAll(params?.queryParams),
		{
			enabled: params?.enabled
		}
	)
}