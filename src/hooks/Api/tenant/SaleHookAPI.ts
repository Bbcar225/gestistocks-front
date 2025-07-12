import {useMutation, useQuery} from "react-query";
import saleService from "../../../services/tenant/saleService.ts";

export const saleQueriesClients = {
	useSaleGetAll: 'useSaleGetAll',
	useSaleGetOne: 'useSaleGetOne'
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

export const useSaleGetOne = (params?: HookApiInterface) => {
	return useQuery(
		[saleQueriesClients.useSaleGetOne, params?.id],
		() => saleService.GetOne(Number(params?.id)),
		{
			enabled: params?.enabled
		}
	)
}

export const useSaleUpdate = (id: number) => {
	return useMutation((formData: SaleFormData) => saleService.Update(id, formData))
}

export const useSaleDownloadInvoice = () => {
	return useMutation((formData: { id: number }) => saleService.DownloadInvoice(formData.id))
}