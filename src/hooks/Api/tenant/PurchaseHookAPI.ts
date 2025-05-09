import {useQuery} from "react-query";
import purchaseService from "../../../services/tenant/purchaseService.ts";

export const purchaseQueriesClients = {
	usePurchaseGetAll: 'usePurchaseGetAll'
}

export const usePurchaseGetAll = (params?: HookApiInterface) => {
	return useQuery(
		[purchaseQueriesClients.usePurchaseGetAll, params?.queryParams],
		() => purchaseService.GetAll(params?.queryParams),
		{
			enabled: params?.enabled
		}
	)
}