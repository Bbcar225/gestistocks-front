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

export const usePurchaseUpdate = (id: number) => {
	return useMutation<ResponseApiInterface<PurchaseInterface>, never, PurchaseUpdateFormDataInterface>((formData) => {
		return purchaseService.Update(id, formData)
	})
}

export const usePurchaseItemsCreate = (purchaseId: number) => {
	return useMutation<ResponseApiInterface<PurchaseInterface>, never, PurchaseItemWriteFormData>((formData) => purchaseService.CreateItems(purchaseId, formData))
}

export const usePurchaseItemsUpdate = (purchaseId: number) => {
	return useMutation<ResponseApiInterface<PurchaseInterface>, never, PurchaseItemWriteFormData>((formData) => purchaseService.UpdateItems(purchaseId, formData))
}

export const usePurchaseItemsRemove = (purchaseId: number) => {
	return useMutation<ResponseApiInterface<PurchaseInterface>, never, PurchaseItemRemoveFormData>((formData) => purchaseService.RemoveItems(purchaseId, formData))
}