import {useMutation, useQuery} from "react-query";
import purchaseService from "../../../services/tenant/purchaseService.ts";

export const purchaseQueriesClients = {
	usePurchaseGetAll: 'usePurchaseGetAll',
	usePurchaseGetOne: 'usePurchaseGetOne'
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

export const usePurchaseCreate = () => {
	return useMutation<ResponseApiInterface<PurchaseInterface>, never, PurchaseFormDataInterface>(purchaseService.Create)
}

export const usePurchaseGetOne = (params?: HookApiInterface) => {
	return useQuery(
		[purchaseQueriesClients.usePurchaseGetOne, params?.id],
		() => purchaseService.GetOne(Number(params?.id)),
		{
			enabled: params?.enabled
		}
	)
}